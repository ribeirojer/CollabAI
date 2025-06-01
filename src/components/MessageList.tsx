type Message = {
	id: string;
	username: string;
	content: string;
};

type Props = {
	messages: Message[];
};

export function MessageList({ messages }: Props) {
	return (
		<div className="h-64 overflow-y-auto border rounded-lg p-4 mb-4 bg-white shadow-inner">
			{messages.map((msg) => (
				<div key={msg.id} className="mb-2">
					<span className="font-semibold text-blue-600">{msg.username}:</span>{" "}
					<span>{msg.content}</span>
				</div>
			))}
		</div>
	);
}
