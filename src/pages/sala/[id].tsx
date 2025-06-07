import Layout from "@/components/Layout";
import { useChat } from "@/hooks/useChat";
import { useUsername } from "@/hooks/useUsername";
import {
	ArrowArcLeftIcon,
	PencilSimpleIcon,
	RobotIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
	const { username, setUsername, removeUsername } = useUsername();
	const router = useRouter();
	const { id } = router.query;
	const { messages, newMessage, setNewMessage, sendMessage, room, isLoading } =
		useChat(username, id);

	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const [tempUsername, setTempUsername] = useState(username);

	const handleUsernameSave = () => {
		setUsername(tempUsername);
		setIsEditingUsername(false);
	};

	return (
		<Layout>
			<div className="max-w-6xl mx-auto p-6">
				<div className="mb-8">
					<h1 className="text-4xl font-extrabold text-gray-800 mb-2">
						{room?.name || "Carregando..."}
					</h1>
					<p className="text-gray-500 text-lg">
						{room?.description || "Carregando descrição..."}
					</p>
				</div>

				<div className="grid lg:grid-cols-4 gap-6">
					{/* Conversa */}
					<div className="lg:col-span-3 space-y-6">
						<div className="bg-white border rounded-3xl shadow p-6 h-[32rem] flex flex-col">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">Conversa</h2>
								{isLoading && (
									<span className="text-xs text-gray-400">Carregando...</span>
								)}
							</div>
							<div className="flex-1 overflow-y-auto space-y-4">
								{messages.map((msg) => (
									<div
										key={msg.id}
										className={`p-4 rounded-xl text-sm ${
											msg.isAI
												? "bg-blue-50 border-l-4 border-blue-500"
												: "bg-gray-50 border"
										}`}
									>
										<div className="flex items-center gap-2 mb-1">
											<span className="font-medium">{msg.username}</span>
											{msg.isAI && (
												<RobotIcon className="w-4 h-4 text-blue-600" />
											)}
										</div>
										<p>{msg.content}</p>
									</div>
								))}
							</div>
						</div>

						<div className="flex gap-3">
							<input
								placeholder="Digite sua mensagem..."
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && sendMessage()}
								className="flex-1 border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								onClick={sendMessage}
								className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition"
								disabled={!newMessage.trim()}
								aria-label="Enviar mensagem"
								title="Enviar mensagem"
								type="button"
							>
								<ArrowArcLeftIcon className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Lateral - Usuário */}
					<div className="space-y-6">
						<div className="bg-white border rounded-3xl shadow p-6">
							<h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
								<UsersIcon className="w-5 h-5" />
								Participantes
							</h2>
							<div className="space-y-3 text-sm text-gray-700">
								<div className="flex items-center justify-between">
									{isEditingUsername ? (
										<>
											<input
												value={tempUsername || ""}
												placeholder="Digite seu nome de usuário"
												onChange={(e) => setTempUsername(e.target.value)}
												className="border rounded-lg p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
											<button
												onClick={handleUsernameSave}
												className="text-blue-600 text-xs font-semibold ml-2"
												disabled={!tempUsername}
												aria-label="Salvar nome de usuário"
												title="Salvar nome de usuário"
												type="button"
											>
												Salvar
											</button>
										</>
									) : (
										<>
											<span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
												{username || "Digite seu nome"}
											</span>
											<button
												onClick={() => setIsEditingUsername(true)}
												className="text-gray-500 hover:text-gray-700 ml-2"
												aria-label="Editar nome de usuário"
												title="Editar nome de usuário"
												disabled={!username}
												type="button"
											>
												<PencilSimpleIcon className="w-4 h-4" />
											</button>
										</>
									)}
								</div>
								<span className="text-gray-400">Você</span>
								{/* Aqui poderia listar outros participantes */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
