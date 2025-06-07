import type { Message, Room } from "@/interfaces";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useChat(username: string, id: string | string[] | undefined) {
	const router = useRouter();
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [room, setRoom] = useState<Room | null>(null);

	useEffect(() => {
		fetchMessages();

		const subscription = supabase
			.channel("realtime:message")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "messages" },
				(payload: { new: Message }) => {
					setMessages((prev) => [...prev, payload.new]);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(subscription);
		};
	}, []);

	useEffect(() => {
		const fetchRoomData = async () => {
			if (id) {
				try {
					setIsLoading(true);
					const response = await fetch(`/api/rooms/${id}`);
					if (response.ok) {
						const data = await response.json();
						setRoom(data);
						setIsLoading(false);
					} else {
						console.error("Failed to fetch room data:", id);
						router.push("/");
					}
					setIsLoading(false);
				} catch (error) {
					console.error("Error fetching room data:", error);
				}
			}
		};
		fetchRoomData();
	}, [id, router]);

	async function fetchMessages() {
		const { data, error } = await supabase
			.from("messages")
			.select("*")
			.eq("roomid", id)
			.order("timestamp", { ascending: true });

		if (!error && data) {
			setMessages(data as Message[]);
		}
	}

	async function sendMessage() {
		if (newMessage.trim() === "" || !username.trim()) return;

		if (!id || Array.isArray(id)) {
			console.error("Invalid room ID:", id);
			return;
		}

		const { error } = await supabase.from("messages").insert({
			content: newMessage,
			username,
			roomid: id,
			isai: false,
		});

		if (error) {
			console.error("Error inserting message:", error);
			return;
		}

		try {
			// Send the message to the API endpoint
			await fetch("/api/chat-reply", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					roomId: id,
				}),
			});
		} catch (error) {
			console.error("Error sending message to API:", error);
		}

		setNewMessage("");
	}

	return {
		messages,
		newMessage,
		setNewMessage,
		sendMessage,
		room,
		isLoading,
	};
}
