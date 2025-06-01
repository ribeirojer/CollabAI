import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabase";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	const { id } = req.query;
	if (typeof id !== "string") {
		return res.status(400).json({ error: "Invalid room id" });
	}

	const { userId } = req.body;
	if (!userId) {
		return res.status(400).json({ error: "Missing userId in request body" });
	}

	try {
		const { error } = await supabase
			.from("room_participants")
			.delete()
			.eq("roomId", id)
			.eq("userId", userId);

		if (error) {
			console.error("Error leaving room:", error);
			return res.status(500).json({ error: error.message });
		}

		return res.status(204).end();
	} catch (error) {
		console.error("Unexpected error leaving room:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
