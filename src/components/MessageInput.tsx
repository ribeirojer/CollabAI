type Props = {
	newMessage: string;
	setNewMessage: (value: string) => void;
	onSend: () => void;
};

export function MessageInput({ newMessage, setNewMessage, onSend }: Props) {
	return (
		<div className="flex space-x-2">
			<input
				className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				placeholder="Digite sua mensagem..."
				onKeyDown={(e) => e.key === "Enter" && onSend()}
			/>
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition"
				onClick={onSend}
				disabled={!newMessage.trim()}
				aria-label="Enviar mensagem"
				title="Enviar mensagem"
				type="button"
			>
				Enviar
			</button>
		</div>
	);
}
