type Props = {
	username: string;
	setUsername: (value: string) => void;
};

export function UsernameInput({ username, setUsername }: Props) {
	return (
		<input
			className="border rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			placeholder="Seu nome"
		/>
	);
}
