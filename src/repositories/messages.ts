import { supabase } from "@/lib/supabase";

export async function getRecentMessages(roomId: string, limit = 10) {
	const { data, error } = await supabase
		.from("messages")
		.select("username, content, timestamp")
		.eq("roomid", roomId)
		.order("timestamp", { ascending: true })
		.limit(limit);

	if (error) {
		console.error("Error fetching recent messages:", error);
		return [];
	}
	return data || [];
}

export async function saveAIReply(aiReply: string, roomId: string) {
	const { error } = await supabase.from("messages").insert({
		content: aiReply,
		username: "openai-bot",
		roomid: roomId,
		isai: true,
	});
	if (error) {
		console.error("Error saving message:", error);
		throw new Error("Failed to save AI reply to database.");
	}
}
