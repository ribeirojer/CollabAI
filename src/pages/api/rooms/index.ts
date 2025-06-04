import type { NextApiRequest, NextApiResponse } from "next";
import type { Room } from "../../../interfaces";
import { createRoom, getPublicRooms } from "../../../repositories/room";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		try {
			const rooms = await getPublicRooms(); // Assuming getRooms is defined to fetch rooms

			if (!rooms || rooms.length === 0) {
				console.log("No rooms found");
				return res.status(404).json({ error: "No rooms found" });
			}
			console.log("Rooms retrieved successfully:", rooms);

			return res.status(200).json(rooms);
		} catch (error) {
			console.error("Unexpected error listing rooms:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	} else if (req.method === "POST") {
		const { name, description, roomType, isPublic, maxParticipants } = req.body;
		console.log("Creating room with data:", req.body);

		if (!name || !description || typeof isPublic !== "boolean") {
			console.error("Missing required fields for room creation");
			return res.status(400).json({ error: "Missing required fields" });
		}

		if (
			!roomType ||
			!["moderador", "criativo", "analista", "mentor"].includes(roomType)
		) {
			console.error("Invalid room type provided");
			return res.status(400).json({ error: "Invalid room type provided" });
		}

		if (maxParticipants <= 0 || maxParticipants > 100) {
			console.error("Invalid max participants value");
			return res.status(400).json({ error: "Invalid max participants value" });
		}

		try {
			const room: Room = {
				name,
				description,
				type: roomType,
				isPublic,
				maxParticipants,
			};

			const createdroom = await createRoom(room);

			if (createdroom === null) {
				console.error("Error creating room: Room creation failed");
				return res.status(500).json({ error: "Room creation failed" });
			}

			return res.status(201).json(createdroom);
		} catch (error) {
			console.error("Unexpected error creating room:", error);
			return res.status(500).json({ error: "Internal server error" });
		}
	} else {
		res.setHeader("Allow", ["GET", "POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
