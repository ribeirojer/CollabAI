export interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	bio?: string;
	createdAt: Date;
	settings: UserSettings;
}

export interface UserSettings {
	theme: "light" | "dark";
	notifications: boolean;
}

export interface Room {
	lastActivity?: string; // data da última atividade
	participants: string;
	host: string;
	id?: string;
	name: string;
	description: string;
	type: "moderador" | "criativo" | "analista" | "mentor";
	isPublic: boolean;
	is_active: boolean;
	maxParticipants: number;
	createdBy?: string; // userId
	createdAt?: Date;
	aiSettings?: AISettings;
	tags?: string[];
}

export interface Message {
	id: string;
	roomId: string;
	username: string | null; // null para mensagens da IA
	content: string;
	isAI: boolean;
	timestamp: Date;
}

export interface RoomParticipant {
	roomId: string;
	userId: string;
	role: "host" | "member";
	joinedAt: Date;
	lastActive: Date;
	status: "online" | "away" | "offline";
}

export interface AISettings {
	personality: "moderator" | "creative" | "analyst" | "mentor";
	contextPrompt: string;
	interventionFrequency: "low" | "medium" | "high";
	capabilities: string[];
}
