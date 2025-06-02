import Layout from "@/components/Layout";
import { MainForm } from "@/components/MainForm";
import Paragraf from "@/components/Paragraf";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function CreateRoomPage() {
	const router = useRouter();
	const [room, setRoom] = useState({
		name: "",
		description: "",
		roomType: "",
		isPublic: true,
		maxParticipants: 5,
		password: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		description: "",
		roomType: "",
		isPublic: "",
		maxParticipants: "",
		password: "",
		general: "",
	});
	const roomNameRef = React.useRef<HTMLInputElement>(null);
	const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
	const roomTypeRef = React.useRef<HTMLSelectElement>(null);
	const maxParticipantsRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);

	const refs = {
		roomName: roomNameRef,
		description: descriptionRef,
		roomType: roomTypeRef,
		maxParticipants: maxParticipantsRef,
		password: passwordRef,
	};

	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleCreateRoom = async () => {
		setErrors({
			name: "",
			description: "",
			roomType: "",
			isPublic: "",
			maxParticipants: "",
			password: "",
			general: "",
		});
		setSuccess(false);

		if (!room.name.trim()) {
			setErrors((prev) => ({ ...prev, name: "O nome da sala é obrigatório." }));
			roomNameRef.current?.focus();
			return;
		}

		if (!room.description.trim()) {
			setErrors((prev) => ({
				...prev,
				description: "A descrição é obrigatória.",
			}));
			descriptionRef.current?.focus();
			return;
		}

		if (!room.roomType) {
			setErrors((prev) => ({
				...prev,
				roomType: "Selecione um tipo de sala.",
			}));
			roomTypeRef.current?.focus();
			return;
		}

		if (room.isPublic === undefined) {
			setErrors((prev) => ({
				...prev,
				isPublic: "Selecione a visibilidade da sala.",
			}));
			return;
		}

		if (room.maxParticipants <= 0) {
			setErrors((prev) => ({
				...prev,
				maxParticipants:
					"O número máximo de participantes deve ser maior que 0.",
			}));
			maxParticipantsRef.current?.focus();
			return;
		}

		if (room.maxParticipants > 20) {
			setErrors((prev) => ({
				...prev,
				maxParticipants:
					"O número máximo de participantes deve ser 20 ou menos.",
			}));
			maxParticipantsRef.current?.focus();
			return;
		}

		if (!room.isPublic && !room.password.trim()) {
			setErrors((prev) => ({
				...prev,
				password: "A senha é obrigatória para salas privadas.",
			}));
			passwordRef.current?.focus();
			return;
		}

		if (room.password && room.password.length < 6) {
			setErrors((prev) => ({
				...prev,
				password: "A senha deve ter pelo menos 6 caracteres.",
			}));
			passwordRef.current?.focus();
			return;
		}

		setLoading(true);
		// Aqui seria a lógica para criar a sala
		console.log({
			roomName: room.name,
			description: room.description,
			roomType: room.roomType,
			isPublic: room.isPublic,
			maxParticipants: room.maxParticipants,
			password: room.password,
		});

		try {
			const response = await fetch("/api/rooms", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: room.name,
					description: room.description,
					roomType: room.roomType,
					isPublic: room.isPublic,
					maxParticipants: room.maxParticipants,
					password: room.password,
				}),
			});
			if (!response.ok) {
				const errorData = await response.json();
				setErrors((prev) => ({
					...prev,
					general: errorData.message || "Erro ao criar sala.",
				}));
				setLoading(false);
				return;
			}
			const data = await response.json();
			console.log("Sala criada com sucesso:", data);
			setLoading(false);

			router.push(`/rooms/${data.id}`);
			setSuccess(true);
		} catch (error) {
			console.error("Erro ao criar sala:", error);
			setLoading(false);
			setErrors((prev) => ({
				...prev,
				general: "Erro ao criar sala. Tente novamente mais tarde.",
			}));
		}
		if (success) {
			alert("Sala criada com sucesso!");
		}
		if (errors.general) {
			alert(errors.general);
		}
		setSuccess(false);
		setLoading(false);
		setErrors({
			name: "",
			description: "",
			roomType: "",
			isPublic: "",
			maxParticipants: "",
			password: "",
			general: "",
		});
	};

	return (
		<Layout>
			<main className="py-6 md:py-12 max-w-3xl mx-auto">
				<Title>Criar nova sala</Title>
				<Paragraf>Configure sua sala de colaboração</Paragraf>
				<MainForm room={room} setRoom={setRoom} errors={errors} refs={refs} />

				{errors.general && (
					<div className="max-w-3xl mx-auto mt-4">
						<p className="text-red-600">{errors.general}</p>
					</div>
				)}
				{success && (
					<div className="max-w-3xl mx-auto mt-4">
						<p className="text-green-600">Sala criada com sucesso!</p>
					</div>
				)}
				<button
					className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 mt-6"
					aria-label="Criar Sala"
					aria-disabled={loading}
					disabled={loading}
					onClick={handleCreateRoom}
					type="button"
				>
					{loading ? "Criando Sala..." : "Criar Sala"}
				</button>
			</main>
		</Layout>
	);
}
