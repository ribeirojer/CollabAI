import type { Message } from "@/interfaces";
import { RobotIcon, UserIcon } from "@phosphor-icons/react";
import React, { type RefObject } from "react";

type ChatConversationProps = {
	messages: Message[];
	bottomRef: RefObject<HTMLDivElement | null>;
	isReplying: boolean;
};

export default function ChatConversation({
	messages,
	bottomRef,
	isReplying,
}: ChatConversationProps) {
	return (
		<div className="border-y border-slate-100 px-4 max-h-[80vh] flex flex-col">
			<div className="flex-1 overflow-y-auto space-y-4">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`shadow p-4 rounded-xl text-sm ${
							msg.isai
								? "bg-purple-50 border-l-4 border-purple-500"
								: "bg-gray-50 border-l-4 border-gray-300"
						}`}
					>
						<div className="flex items-center gap-2 mb-1">
							{msg.isai ? (
								<RobotIcon className="w-4 h-4 text-purple-600" />
							) : (
								<UserIcon className="w-4 h-4 text-slate-600" />
							)}
							<span className="font-semibold">{msg.username}</span>
						</div>
						<p>{msg.content}</p>
					</div>
				))}
				{isReplying && (
					<div className="flex items-center space-x-2 mt-2">
						<div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
							<div className="flex space-x-1">
								<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0s]" />
								<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
								<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
							</div>
						</div>
						<span className="text-sm text-gray-500">Bot digitando...</span>
					</div>
				)}
				<div ref={bottomRef} />
			</div>
		</div>
	);
}
