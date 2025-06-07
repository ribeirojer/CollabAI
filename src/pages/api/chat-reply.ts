import type { Room } from "@/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

type Persona = "moderador" | "criativo" | "analista" | "mentor";

const personaPrompts: Record<Persona, string> = {
	moderador:
		"Facilite a discussão de forma organizada, garantindo que todos sejam ouvidos e que as ideias fluam de maneira estruturada.",
	criativo:
		"Sugira ideias inovadoras, faça conexões inesperadas e incentive pensamentos fora da caixa.",
	analista:
		"Ofereça uma análise crítica e baseada em dados, focando nos pontos fortes e fracos das ideias discutidas.",
	mentor:
		"Oriente com base na sua experiência, fornecendo feedback construtivo e incentivando o desenvolvimento pessoal e profissional.",
};

async function fetchRoom(roomId: string): Promise<Room | null> {
	const { data, error } = await supabase
		.from("rooms")
		.select("*")
		.eq("id", roomId)
		.single();
	if (error || !data) {
		console.error("Error fetching room data:", error);
		return null;
	}
	return data as Room;
}

async function fetchRecentMessages(roomId: string, limit = 10) {
	const { data, error } = await supabase
		.from("messages")
		.select("username, content, timestamp")
		.eq("roomid", roomId)
		.order("timestamp", { ascending: false })
		.limit(limit);

	if (error) {
		console.error("Error fetching recent messages:", error);
		return [];
	}
	return data || [];
}

function buildSystemPrompt(
	room: Room,
	selectedPersona: Persona | null,
): string {
	if (selectedPersona) {
		return `Você está atuando como ${room.type.toUpperCase()}. ${personaPrompts[selectedPersona]} Responda de maneira clara, curta, objetiva e profissional. Evite formatar as respostas. Dados da sala: ${room.name} - ${room.description}`;
	}
	return "Você é um assistente virtual. Responda de forma clara, curta, objetiva e profissional. Evite formatar as respostas.";
}

function buildRecentMessagesText(
	recentMessages: { username: string; content: string; timestamp: string }[],
) {
	return recentMessages
		.map(
			(msg) =>
				`timestamp: ${new Date(msg.timestamp).toLocaleString()} ${msg.username || "Usuário"}: ${msg.content}`,
		)
		.join("\n\n");
}

async function sendToOpenAI(systemPrompt: string, userContent: string) {
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "gpt-4o-mini",
			messages: [
				{ role: "system", content: systemPrompt },
				{ role: "user", content: userContent },
			],
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error("OpenAI API error:", errorText);
		throw new Error("Failed to generate reply from OpenAI.");
	}

	const aiData = await response.json();
	return (
		aiData.choices?.[0]?.message?.content?.trim() || "Erro ao gerar resposta."
	);
}

async function saveAIReply(aiReply: string, roomId: string) {
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
		const room = await fetchRoom(roomId);
		if (!room) {
			return res.status(500).json({ error: "Failed to fetch room data." });
		}

		const selectedPersona = room.type as Persona | null;
		const recentMessages = await fetchRecentMessages(roomId);
		const systemPrompt = buildSystemPrompt(room, selectedPersona);
		const recentMessagesText = buildRecentMessagesText(recentMessages);

		console.log("Recent messages:", recentMessagesText);

		const userContent = `Você é um assistente virtual atuando como ${room.type}. Aqui estão as mensagens recentes:\n${recentMessagesText}`;

		const aiReply = await sendToOpenAI(systemPrompt, userContent);

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
