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
	id?: string;
	name: string;
	description: string;
	type: "moderador" | "criativo" | "analista" | "mentor";
	isPublic: boolean;
	maxParticipants: number;
	createdBy?: string; // userId
	createdAt?: Date;
	aiSettings?: AISettings;
	tags?: string[];
}

export interface Message {
	id: string;
	roomId: string;
	userId: string | null; // null para mensagens da IA
	content: string;
	isAI: boolean;
	timestamp: Date;
	reactions: Reaction[];
	metadata?: any; // dados adicionais como links, imagens, etc.
}

export interface Reaction {
	userId: string;
	type: "like" | "dislike" | "love" | "laugh" | "confused";
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

export interface Idea {
	id: string;
	roomId: string;
	content: string;
	createdBy: string; // userId
	createdAt: Date;
	votes: number;
	tags?: string[];
}

export interface AISettings {
	personality: "moderator" | "creative" | "analyst" | "mentor";
	contextPrompt: string;
	interventionFrequency: "low" | "medium" | "high";
	capabilities: string[];
}
