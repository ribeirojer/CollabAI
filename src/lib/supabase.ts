import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!NEXT_PUBLIC_SUPABASE_URL) {
	console.log(
		"NEXT_PUBLIC_Supabase URL must be defined in environment variables",
	);
	throw new Error(
		"NEXT_PUBLIC_Supabase URL must be defined in environment variables",
	);
}

if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
	console.log("NEXT_PUBLIC_ANON_KEY must be defined in environment variables");
	throw new Error(
		"NEXT_PUBLIC_Supabase Anon Key must be defined in environment variables",
	);
}

export const supabase = createClient(
	NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
