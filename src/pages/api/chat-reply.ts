import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

type Persona = "Moderador" | "Criativo" | "Analista" | "Mentor";

const personaPrompts: Record<Persona, string> = {
	Moderador: "Facilita discussões e organiza ideias.",
	Criativo: "Sugere ideias inovadoras e conexões.",
	Analista: "Foca em dados e análise crítica.",
	Mentor: "Oferece orientação e feedback construtivo.",
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const {
		content,
		username,
		persona,
	}: { content: string; username: string; persona?: Persona } = req.body;

	if (!content || !username) {
		console.error("Missing content or username:", { content, username });
		return res.status(400).json({ error: "Missing content or username" });
	}

	const selectedPersona = persona && personaPrompts[persona] ? persona : null;

	try {
		const systemPrompt = selectedPersona
			? `Atue como ${persona}: ${personaPrompts[persona as Persona]}`
			: "Responda de forma útil e objetiva.";

		console.log("Sending to OpenAI with persona:", systemPrompt);

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
					{ role: "user", content },
				],
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error("OpenAI API error:", errorText);
			return res
				.status(500)
				.json({ error: "Failed to generate reply from OpenAI." });
		}

		const data = await response.json();
		const aiReply =
			data.choices?.[0]?.message?.content?.trim() || "Erro ao gerar resposta.";

		console.log("OpenAI reply:", aiReply);

		const { error: dbError } = await supabase.from("messages").insert({
			content: aiReply,
			username: "openai-bot",
			//persona: selectedPersona // opcional: salvar quem foi o "modo" usado
		});

		if (dbError) {
			console.error("Error saving message:", dbError);
			return res
				.status(500)
				.json({ error: "Failed to save AI reply to database." });
		}

		return res
			.status(200)
			.json({ message: "Reply sent successfully.", aiReply });
	} catch (error) {
		console.error("Unexpected error:", error);
		return res.status(500).json({ error: "Internal server error." });
	}
}
