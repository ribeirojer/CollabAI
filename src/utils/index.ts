import type { Persona, Room } from "@/interfaces";

const personaPrompts: Record<Persona, string> = {
	moderador:
		"Facilite a conversa de forma organizada, incentive a participação equilibrada e mantenha o foco do grupo.",
	criativo:
		"Sugira ideias originais, promova conexões inusitadas e estimule o pensamento fora do convencional.",
	analista:
		"Apresente análises críticas com base em lógica e dados, destacando riscos, oportunidades e argumentos sólidos.",
	mentor:
		"Compartilhe conselhos práticos com empatia, fornecendo orientações construtivas com foco em crescimento pessoal e profissional.",
};

export function buildSystemPrompt(
	room: Room,
	selectedPersona: Persona,
): string {
	return `
Você atuará como um assistente na sala "${room.name}", cuja função é ${room.type}.
Adote o papel de um ${selectedPersona} e siga a seguinte diretriz comportamental:

${personaPrompts[selectedPersona]}

Regras gerais:
- Foque nas mensagens mais recentes dos usuários.
- Responda de forma clara, curta, objetiva e profissional.
- Não utilize formatação (negrito, itálico, listas, etc.).
- Evite repetições ou explicações desnecessárias.
- Sempre mantenha o foco no assunto da sala: ${room.description}.
`.trim();
}

export function buildRecentMessagesText(
	recentMessages: { username: string; content: string; timestamp: string }[],
): string {
	const formatter = new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
		timeStyle: "short",
	});

	const formattedMessages = recentMessages
		.map(({ username, content, timestamp }) => {
			const time = formatter.format(new Date(timestamp));
			const name = username || "Usuário";
			return `[${time}] ${name}: ${content.trim()}`;
		})
		.join("\n\n"); // separa os turnos da conversa

	return `# Conversa recente:\n\n${formattedMessages}`;
}

export async function sendToOpenAI(systemPrompt: string, userContent: string) {
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
