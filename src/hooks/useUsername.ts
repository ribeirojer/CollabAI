import { useEffect, useState } from "react";

const USERNAME_KEY = "username";

export const UsernameStorage = {
	get(): string | null {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(USERNAME_KEY);
	},

	set(username: string): void {
		if (typeof window === "undefined") return;
		localStorage.setItem(USERNAME_KEY, username);
	},

	remove(): void {
		if (typeof window === "undefined") return;
		localStorage.removeItem(USERNAME_KEY);
	},
};

export function useUsername() {
	const [username, setUsernameState] = useState<string>("");

	useEffect(() => {
		const storedUsername = UsernameStorage.get();
		setUsernameState(storedUsername || "");
	}, []);

	const setUsername = (newUsername: string) => {
		UsernameStorage.set(newUsername);
		setUsernameState(newUsername);
	};

	const removeUsername = () => {
		UsernameStorage.remove();
		setUsernameState("");
	};

	return { username, setUsername, removeUsername };
}
