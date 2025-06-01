import Layout from "@/components/Layout";
import { MessageInput } from "@/components/MessageInput";
import { MessageList } from "@/components/MessageList";
import { UsernameInput } from "@/components/UsernameInput";
import { supabase } from "@/lib/supabase";
import { ArrowArcLeftIcon, RobotIcon, Users } from "@phosphor-icons/react";
import { useState } from "react";
/*
export default function RoomPage() {
  const [message, setMessage] = useState("")
  const [messages] = useState([
    {
      id: 1,
      user: "IA",
      content: "Olá! Vamos começar nosso brainstorming. Qual problema queremos resolver?",
      isAI: true,
      time: "14:30",
    },
    {
      id: 2,
      user: "Ana",
      content: "Penso que o problema é o baixo engajamento dos usuários.",
      isAI: false,
      time: "14:32",
    },
    {
      id: 3,
      user: "Carlos",
      content: "Que tal gamificação? Pontos e rankings podem ajudar.",
      isAI: false,
      time: "14:33",
    },
  ])

  const participants = [
    { name: "Ana", status: "online" },
    { name: "Carlos", status: "online" },
    { name: "Maria", status: "away" },
    { name: "IA", status: "online", isAI: true },
  ]

  const handleSend = () => {
    if (message.trim()) {
      // Aqui enviaria a mensagem
      setMessage("")
    }
  }

  return (
    <Layout>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">IA na Saúde - Brainstorming</h1>
          <p className="text-gray-600">4 participantes online</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="h-96">
              <div>
                <h2 className="text-lg">Conversa</h2>
              </div>
              <div className="h-64 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.isAI ? "bg-blue-50 border-l-4 border-blue-500" : "bg-white border"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{msg.user}</span>
                      {msg.isAI && <RobotIcon className="h-3 w-3 text-blue-600" />}
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <input
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <button onClick={handleSend}>
                <ArrowArcLeftIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h2 className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participantes
                </h2>
              </div>
              <div className="space-y-2">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          participant.status === "online" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-sm">{participant.name}</span>
                      {participant.isAI && <RobotIcon className="h-3 w-3 text-blue-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div>
                <h2 className="text-lg">Ideias</h2>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-white border rounded text-sm">
                  <div className="font-medium">Gamificação</div>
                  <div className="text-gray-600">por Carlos</div>
                </div>
                <div className="p-2 bg-white border rounded text-sm">
                  <div className="font-medium">Notificações Smart</div>
                  <div className="text-gray-600">por Ana</div>
                </div>
                <button className="w-full">
                  + Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>  )
}
*/
import { useEffect } from "react";

type Message = {
	id: string;
	username: string;
	content: string;
	inserted_at: string;
};

export default function Home() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [username, setUsername] = useState(
		`User${Math.floor(Math.random() * 1000)}`,
	);

	useEffect(() => {
		fetchMessages();

		const subscription = supabase
			.channel("realtime:messages")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "messages" },
				(payload: any) => {
					setMessages((prev) => [...prev, payload.new]);
					console.log("New message received:", payload.new);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(subscription);
		};
	}, []);

	async function fetchMessages() {
		const { data, error } = await supabase
			.from("messages")
			.select("*")
			.order("inserted_at", { ascending: true });

		if (!error && data) {
			setMessages(data as Message[]);
		}
	}

	async function sendMessage() {
		if (newMessage.trim() === "" || !username.trim()) return;

		const { error } = await supabase.from("messages").insert({
			content: newMessage,
			username,
		});

		if (!error) {
			await fetch("/api/chat-reply", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: newMessage,
					username,
					persona: "Moderador",
				}),
			});

			setNewMessage("");
		} else {
			console.error("Error sending message:", error);
		}
	}

	return (
		<Layout>
			<div className="mx-auto max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
					Chat
				</h1>

				<UsernameInput username={username} setUsername={setUsername} />

				<MessageList messages={messages} />

				<MessageInput
					newMessage={newMessage}
					setNewMessage={setNewMessage}
					onSend={sendMessage}
				/>
			</div>
		</Layout>
	);
}
