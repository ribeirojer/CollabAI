import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { useUsername } from "@/hooks/useUsername";
import {
	PencilSimple,
	PencilSimpleIcon,
	SignOut,
	SignOutIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
	const { username, setUsername, removeUsername } = useUsername();
	const [isEditing, setIsEditing] = useState(false);
	const [tempName, setTempName] = useState(username || "");
	const [error, setError] = useState<string>("");
	const usernameRef = React.useRef<HTMLInputElement>(null);

	const handleSave = () => {
		if (!tempName.trim()) {
			setError("Nome não pode estar vazio.");
			usernameRef.current?.focus();
			return;
		}
		if (tempName.length < 3) {
			setError("Nome deve ter pelo menos 3 caracteres.");
			usernameRef.current?.focus();
			return;
		}
		if (tempName.length > 20) {
			setError("Nome não pode ter mais de 20 caracteres.");
			usernameRef.current?.focus();
			return;
		}
		if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(tempName)) {
			setError("Nome deve conter apenas letras e espaços.");
			usernameRef.current?.focus();
			return;
		}
		setUsername(tempName.trim());
		setIsEditing(false);
		setError("");
	};

	const handleIsEditing = () => {
		setIsEditing(true);
		setError("");
		setInterval(() => {
			usernameRef.current?.focus();
		}, 100);
	};

	return (
		<Layout>
			<div className="w-full lg:max-w-6xl mx-auto px-4 py-10 space-y-10">
				<Title>🧑 Perfil do Usuário</Title>
				<div className="mt-8 w-full bg-white border border-gray-200 rounded-3xl shadow-md p-6 space-y-6">
					{isEditing ? (
						<div className="flex flex-col sm:flex-row sm:items-center gap-3">
							<input
								type="text"
								value={tempName}
								onChange={(e) => setTempName(e.target.value)}
								placeholder="Digite seu nome"
								className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
								ref={usernameRef}
							/>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<div className="flex justify-between gap-2">
								<button
									onClick={handleSave}
									className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
									type="button"
								>
									Salvar
								</button>
								<button
									onClick={() => setIsEditing(false)}
									className="text-gray-500 hover:text-gray-700 px-4 py-2 transition"
									type="button"
								>
									Cancelar
								</button>
							</div>
						</div>
					) : (
						<div className="flex items-center justify-between">
							<p className="text-lg text-gray-700">
								<strong>Nome:</strong>{" "}
								<span className="bg-blue-100 text-blue-800 ml-2 px-3 py-1 rounded-full font-medium">
									{username || "Não definido"}
								</span>
							</p>
						</div>
					)}

					<hr className="border-t border-gray-100" />

					<div className="flex justify-between items-center">
						{!isEditing ? (
							<button
								onClick={handleIsEditing}
								className="flex items-center gap-2 text-blue-600 hover:underline"
								type="button"
							>
								<PencilSimpleIcon className="w-4 h-4" />
								Editar
							</button>
						) : (
							<div />
						)}
						<button
							onClick={removeUsername}
							className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
							type="button"
						>
							<SignOutIcon className="w-4 h-4" />
							Sair
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ProfilePage;
