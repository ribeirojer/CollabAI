import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import type React from "react";
import type { RefObject } from "react";

type ChatInputProps = {
	isLoading: boolean;
	isReplying: boolean;
	newMessage: string;
	setNewMessage: (msg: string) => void;
	sendMessage: () => void;
	newMessageError: string;
	newMessageRef: RefObject<HTMLInputElement | null>;
};

export default function ChatInput({
	isLoading,
	isReplying,
	newMessage,
	setNewMessage,
	sendMessage,
	newMessageError,
	newMessageRef,
}: ChatInputProps) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<section className="mt-6">
			<div className="flex items-center gap-2 bg-white border border-gray-300 rounded-2xl p-3 shadow-sm">
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Digite sua mensagem..."
					className="flex-1 px-4 py-2 border-none focus:outline-none focus:ring-0 rounded-xl placeholder-gray-400"
					ref={newMessageRef}
				/>

				<button
					onClick={sendMessage}
					disabled={isLoading || isReplying}
					className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition"
					type="button"
				>
					<PaperPlaneRightIcon className="w-4 h-4" weight="bold" />
					<span>Enviar</span>
				</button>
			</div>

			{newMessageError && (
				<p className="text-center lg:text-start mt-2 text-red-500">
					{newMessageError}
				</p>
			)}
		</section>
	);
}
