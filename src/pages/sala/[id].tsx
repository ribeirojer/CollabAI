import Layout from "@/components/Layout";
import { useChat } from "@/hooks/useChat";
import { ArrowArcLeftIcon, RobotIcon, Users } from "@phosphor-icons/react";
import { useState } from "react";

export default function Home() {
	const [username] = useState(`User${Math.floor(Math.random() * 1000)}`);
	const { messages, newMessage, setNewMessage, sendMessage } =
		useChat(username);

	return (
		<Layout>
			<div className="max-w-6xl mx-auto p-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-800">
						IA na Saúde - Brainstorming
					</h1>
					<p className="text-gray-500 mt-1">4 participantes online</p>
				</div>

				<div className="grid lg:grid-cols-4 gap-6">
					<div className="lg:col-span-3 space-y-4">
						<div className="bg-white border rounded-lg shadow p-4 h-96 flex flex-col">
							<h2 className="text-lg font-semibold mb-2">Conversa</h2>
							<div className="flex-1 overflow-y-auto space-y-3">
								{messages.map((msg) => (
									<div
										key={msg.id}
										className={`p-3 rounded-lg text-sm ${
											msg.username === "openai-bot"
												? "bg-blue-50 border-l-4 border-blue-500"
												: "bg-gray-50 border"
										}`}
									>
										<div className="flex items-center gap-2 mb-1">
											<span className="font-medium">{msg.username}</span>
											{msg.username === "openai-bot" && (
												<RobotIcon className="w-4 h-4 text-blue-600" />
											)}
										</div>
										<p>{msg.content}</p>
									</div>
								))}
							</div>
						</div>

						<div className="flex gap-2">
							<input
								placeholder="Digite sua mensagem..."
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && sendMessage()}
								className="flex-1 border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								onClick={sendMessage}
								className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
							>
								<ArrowArcLeftIcon className="w-5 h-5" />
							</button>
						</div>
					</div>

					<div>
						<div className="bg-white border rounded-lg shadow p-4">
							<h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
								<Users className="w-5 h-5" />
								Participantes
							</h2>
							<div className="space-y-2 text-sm text-gray-700">
								<span>{username} (Você)</span>
								{/* Aqui poderia listar os outros participantes se quiser */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
