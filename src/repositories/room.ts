import type { Room } from "@/interfaces";
import { supabase } from "@/lib/supabase";

export async function createRoom(room: Room): Promise<Room | null> {
	const roomData = {
		name: room.name,
		description: room.description,
		type: room.type,
		ispublic: room.isPublic,
		maxparticipants: room.maxParticipants,
		host: room.host,
	};

	const { data, error } = await supabase
		.from("rooms")
		.insert([roomData])
		.select()
		.single();

	if (error) {
		console.error("Error creating room:", error);
		return null;
	}

	return data;
}

export async function getPublicRooms(): Promise<Room[] | null> {
	const { data, error } = await supabase
		.from("rooms")
		.select("*")
		.eq("ispublic", true)
		.order("createdat", { ascending: false });

	if (error) {
		console.error("Error listing rooms:", error.message);
		return null;
	}

	return data;
}

export async function getRoomById(id: string): Promise<Room | null> {
	const { data, error } = await supabase
		.from("rooms")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching room by ID:", error.message);
		return null;
	}

	return data;
}
