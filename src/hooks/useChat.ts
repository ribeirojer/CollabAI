import type { Message, Room } from "@/interfaces";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export function useChat(username: string, id: string | string[] | undefined) {
	const router = useRouter();
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [room, setRoom] = useState<Room | null>(null);
	const [newMessageError, setNewMessageError] = useState("");
	const [isReplying, setIsReplying] = useState(false);
	const newMessageRef = useRef<HTMLInputElement | null>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	const roomId = typeof id === "string" ? id : id?.[0] || "";

	// 🧠 Validações reutilizáveis
	const validateMessage = () => {
		if (!newMessage.trim()) {
			return "Mensagem não pode ser vazia.";
		}
		if (newMessage.length > 500) {
			return "Mensagem não pode ter mais de 500 caracteres.";
		}
		if (!username || username.length > 20) {
			return "Nome de usuário inválido.";
		}
		if (!roomId) {
			return "ID de sala inválido.";
		}
		return "";
	};

	// 📥 Buscar dados da sala
	const fetchRoomData = async () => {
		if (!roomId) return;

		try {
			setIsLoading(true);
			const response = await fetch(`/api/rooms/${roomId}`);
			if (!response.ok) {
				console.error("Erro ao buscar sala:", roomId);
				router.push("/");
				return;
			}
			const data = await response.json();
			setRoom(data);
		} catch (error) {
			console.error("Erro ao buscar sala:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// 📥 Buscar mensagens
	const fetchMessages = async () => {
		if (!roomId) return;

		const { data, error } = await supabase
			.from("messages")
			.select("*")
			.eq("roomid", roomId)
			.order("timestamp", { ascending: true });

		if (error) {
			console.error("Erro ao buscar mensagens:", error);
			return;
		}

		setMessages(data as Message[]);

		if (process.env.NODE_ENV === "development") {
			console.log("Mensagens carregadas:", data.length);
		}
	};

	// 📤 Enviar nova mensagem
	const sendMessage = async () => {
		setNewMessageError("");

		const error = validateMessage();
		if (error) {
			setNewMessageError(error);
			newMessageRef.current?.focus();
			return;
		}
		try {
			setIsLoading(true);
			const { error: insertError } = await supabase.from("messages").insert({
				content: newMessage,
				username,
				roomid: roomId,
				isai: false,
			});

			if (insertError) {
				console.error("Erro ao inserir mensagem:", insertError);
				setNewMessageError("Erro ao enviar mensagem.");
				return;
			}

			setNewMessage("");

			setIsReplying(true); // Início da resposta automática

			await fetch("/api/chat-reply", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ roomId }),
			});
		} catch (err) {
			console.error("Erro geral ao enviar mensagem:", err);
			setNewMessageError("Erro inesperado.");
		} finally {
			setIsLoading(false);
			setIsReplying(false); // Fim da resposta automática
		}
	};

	// 📡 Efeito de inicialização
	useEffect(() => {
		if (!roomId) return;

		fetchRoomData();
		fetchMessages();

		const subscription = supabase
			.channel("realtime:message")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "messages",
				},
				(payload: { new: Message }) => {
					setMessages((prev) => [...prev, payload.new]);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(subscription);
		};
	}, [roomId]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isReplying]);

	return {
		messages,
		newMessage,
		setNewMessage,
		sendMessage,
		room,
		isLoading,
		newMessageError,
		newMessageRef,
		bottomRef,
		isReplying,
	};
}
