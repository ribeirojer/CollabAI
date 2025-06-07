import { assert, describe, it } from "vitest";
import { httpClient } from "./utils";
import { Room } from "@/interfaces";

const featuredRooms: Room[] = [
	{
        id: "1",
		name: "Ideias sobre Hackathon",
		description: "Brainstorming para o hackathon da Adapta",
		type: "criativo",
		maxParticipants: 8,
		is_active: true,
		host: "Maria Silva",
		isPublic: true,
		participants: "Maria Silva, João Santos",
	},
	{
		id: "2",
		name: "Desenvolvimento App Sustentável",
		description: "Projeto colaborativo para app de sustentabilidade urbana",
		type: "moderador",
		maxParticipants: 12,
		is_active: true,
		host: "João Santos",
		isPublic: true,
		participants: "João Santos, Maria Silva",
	},
	{
		id: "3",
		name: "Curso: IA para Iniciantes",
		description: "Aula interativa sobre conceitos fundamentais de IA",
		type: "analista",
		maxParticipants: 25,
		is_active: true,
		host: "Prof. Ana Costa",
		isPublic: false,
		participants: "",
	},
	{
		id: "4",
		name: "Mentoria em Desenvolvimento Pessoal",
		description: "Sessões de mentoria para crescimento profissional",
		type: "mentor",
		maxParticipants: 5,
		is_active: true,
		host: "Carlos Oliveira",
		isPublic: true,
		participants: "Carlos Oliveira, Ana Costa",
	},
];

describe("/api/room", () => {
	const url = "http://localhost:3000/api/rooms"; // URL da API
	const mockRoom = featuredRooms[3]; // Mock de uma sala de tes1e

	it("should return 400 if no room data is provided", async () => {
		const response = await httpClient.post(url, {});
		const data = await response.json();
		assert.equal(response.status, 400);
		assert.equal(data.error, "Missing required fields");
	});

	it("should return 400 if room is invalid", async () => {
		const response = await httpClient.post(url, { ...mockRoom, name: "" });
		const data = await response.json();
		assert.equal(response.status, 400);
		assert.equal(data.error, "Missing required fields");
	});

	it("should return 400 if room type is invalid", async () => {
		const response = await httpClient.post(url, {
			...mockRoom,
			type: "invalid",
		});
		const data = await response.json();
		assert.equal(response.status, 400);
		assert.equal(data.error, "Invalid room type provided");
	});

	it("should return 400 if max participants is invalid", async () => {
		const response = await httpClient.post(url, {
			...mockRoom,
			maxParticipants: 0,
		});
		const data = await response.json();
		assert.equal(response.status, 400);
		assert.equal(data.error, "Invalid max participants value");
	});

    it("should return 400 if host is invalid", async () => {
		const response = await httpClient.post(url, {
			...mockRoom,
			host: "",
		});
		const data = await response.json();
		assert.equal(response.status, 400);
		assert.equal(data.error, "Invalid host provided");
	});

	it.skip("should create a room successfully", async () => {
		const response = await httpClient.post(url, mockRoom);
		const data = await response.json();
		assert.equal(response.status, 201);
		assert.ok(data.id, "Room ID should be present");
		assert.equal(data.name, mockRoom.name);
		assert.equal(data.description, mockRoom.description);
		assert.equal(data.type, mockRoom.type);
		assert.equal(data.ispublic, mockRoom.isPublic);
		assert.equal(data.maxparticipants, mockRoom.maxParticipants);
	})
});
