type ChatRoomHeaderProps = {
	name?: string;
	description?: string;
};

export default function ChatRoomHeader({
	name,
	description,
}: ChatRoomHeaderProps) {
	return (
		<div className="mb-8">
			<h1 className="text-xl md:text-4xl font-extrabold text-gray-800 mb-2">
				{name || "Carregando..."}
			</h1>
			<p className="text-gray-500 text-base md:text-lg">
				{description || "Carregando descrição..."}
			</p>
		</div>
	);
}
