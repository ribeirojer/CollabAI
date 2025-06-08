import ChatConversation from "@/components/ChatRoom/ChatConversation";
import ChatInput from "@/components/ChatRoom/ChatInput";
import ChatRoomHeader from "@/components/ChatRoom/ChatRoomHeader";
import Layout from "@/components/Layout";
import { useChat } from "@/hooks/useChat";
import { useUsername } from "@/hooks/useUsername";
import { useRouter } from "next/router";

export default function Home() {
	const { username } = useUsername();
	const router = useRouter();
	const { id } = router.query;

	const {
		messages,
		newMessage,
		setNewMessage,
		sendMessage,
		room,
		isLoading,
		newMessageError,
		newMessageRef,
		bottomRef,
		isReplying,
	} = useChat(username, id);

	return (
		<Layout>
			<main className="p-4 mb-4 lg:p-8 lg:max-w-6xl lg:mx-auto">
				<ChatRoomHeader name={room?.name} description={room?.description} />
				<ChatConversation
					messages={messages}
					isLoading={isLoading}
					isReplying={isReplying}
					bottomRef={bottomRef}
				/>
				<ChatInput
					isLoading={isLoading}
					isReplying={isReplying}
					newMessage={newMessage}
					setNewMessage={setNewMessage}
					sendMessage={sendMessage}
					newMessageError={newMessageError}
					newMessageRef={newMessageRef}
				/>
			</main>
		</Layout>
	);
}
