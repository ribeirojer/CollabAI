import type { Persona } from "@/interfaces";
import { getRecentMessages, saveAIReply } from "@/repositories/messages";
import { getRoomById } from "@/repositories/rooms";
import type { NextApiRequest, NextApiResponse } from "next";
import {
	buildRecentMessagesText,
	buildSystemPrompt,
	sendToOpenAI,
} from "../../utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { roomId }: { roomId: string } = req.body;

	if (!roomId) {
		console.error("Missing roomId:", { roomId });
		return res.status(400).json({ error: "Missing roomId" });
	}

	try {
		const room = await getRoomById(roomId);
		if (!room) {
			return res.status(500).json({ error: "Failed to fetch room data." });
		}

		const selectedPersona = room.type as Persona;
		const recentMessages = await getRecentMessages(roomId);
		const systemPrompt = buildSystemPrompt(room, selectedPersona);
		const recentMessagesText = buildRecentMessagesText(recentMessages);

		console.log(recentMessagesText);

		const aiReply = await sendToOpenAI(systemPrompt, recentMessagesText);

		console.log("OpenAI reply:", aiReply);

		await saveAIReply(aiReply, roomId);

		return res
			.status(200)
			.json({ message: "Reply sent successfully.", aiReply });
	} catch (error) {
		console.error("Unexpected error:", error);
		return res.status(500).json({ error: "Internal server error." });
	}
}
