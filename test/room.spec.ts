import { assert, describe, it, vi } from "vitest";
import { httpClient } from "./utils";

describe("/api/room", () => {
	const url = "http://localhost:3000/api/rooms"; // URL da API
	const mockRoom = {
		name: "Test Room",
		description: "This is a test room",
		roomType: "moderador",
		isPublic: true,
		maxParticipants: 10,
	};

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
			roomType: "invalid",
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

	it("should create a room successfully", async () => {
		const response = await httpClient.post(url, mockRoom);
		const data = await response.json();
		assert.equal(response.status, 201);
		assert.ok(data.id, "Room ID should be present");
		assert.equal(data.name, mockRoom.name);
		assert.equal(data.description, mockRoom.description);
		assert.equal(data.type, mockRoom.roomType);
		assert.equal(data.isPublic, mockRoom.isPublic);
		assert.equal(data.maxParticipants, mockRoom.maxParticipants);
	})
});
