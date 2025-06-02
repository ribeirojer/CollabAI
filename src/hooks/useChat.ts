import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export type Message = {
	id: string;
	username: string;
	content: string;
	inserted_at: string;
};

export function useChat(username: string) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		fetchMessages();

		const subscription = supabase
			.channel("realtime:messages")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "messages" },
				(payload: any) => {
					setMessages((prev) => [...prev, payload.new]);
					console.log("New message received:", payload.new);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(subscription);
		};
	}, []);

	async function fetchMessages() {
		const { data, error } = await supabase
			.from("messages")
			.select("*")
			.order("inserted_at", { ascending: true });

		if (!error && data) {
			setMessages(data as Message[]);
		}
	}

	async function sendMessage() {
		if (newMessage.trim() === "" || !username.trim()) return;

		const { error } = await supabase.from("messages").insert({
			content: newMessage,
			username,
		});

		if (!error) {
			await fetch("/api/chat-reply", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: newMessage,
					username,
					persona: "Moderador",
				}),
			});

			setNewMessage("");
		} else {
			console.error("Error sending message:", error);
		}
	}

	return {
		messages,
		newMessage,
		setNewMessage,
		sendMessage,
	};
}
