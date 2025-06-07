import {
	ClockIcon,
	LightbulbIcon,
	LightningAIcon,
	RobotIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import React, { type JSX, useEffect, useState } from "react";
import type { Room } from "../interfaces";
import Paragraf from "./Paragraf";
import Title from "./Title";

const iconMap: Record<string, JSX.Element> = {
	mentor: <UsersIcon size={32} />,
	analista: <RobotIcon size={32} />,
	moderador: <LightningAIcon size={32} />,
	criativo: <LightbulbIcon size={32} />,
};

const typeColors: Record<string, string> = {
	mentor: "from-orange-500 to-yellow-400",
	analista: "from-red-500 to-pink-500",
	moderador: "from-teal-500 to-green-400",
	criativo: "from-purple-600 to-pink-400",
};

const FeaturedRooms = () => {
	const [rooms, setRooms] = useState<Room[]>([]);

	useEffect(() => {
		const fetchFeaturedRooms = async () => {
			try {
				const response = await fetch("/api/rooms");
				const data = await response.json();
				setRooms(data);
			} catch (error) {
				console.error("Erro ao buscar salas em destaque:", error);
			}
		};

		fetchFeaturedRooms();
	}, []);

	return (
		<section className="mb-20">
			<Title>🚀 Salas em Destaque</Title>
			<Paragraf className="text-lg text-center max-w-2xl mx-auto">
				Mergulhe em experiências colaborativas criadas por especialistas e
				entusiastas.
			</Paragraf>

			<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
				{rooms.map((room) => {
					const gradient =
						typeColors[room.type] ?? "from-indigo-500 to-blue-500";

					return (
						<div
							key={room.id}
							className={`bg-gradient-to-br ${gradient} text-white rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between`}
						>
							<div className="flex items-start justify-between">
								<div className="bg-white/20 p-3 rounded-xl">
									{iconMap[room.type] ?? <LightbulbIcon size={32} />}
								</div>
								<div className="flex flex-col items-end gap-2 text-sm">
									{room.is_active && (
										<span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
											<RobotIcon size={14} />
											IA no modo {room.type}
										</span>
									)}
								</div>
							</div>

							<div className="mt-6">
								<h3 className="text-2xl font-bold mb-2">{room.name}</h3>
								<p className="text-sm text-white/90 line-clamp-3">
									{room.description}
								</p>
							</div>

							<div className="mt-6 flex flex-col gap-4">
								<div className="flex items-center gap-2">
									<div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
										{room.host
											?.split(" ")
											.map((n) => n[0])
											.join("")}
									</div>
									<span className="text-sm">Criada por {room.host}</span>
								</div>

								<Link
									href={`/sala/${room.id}`}
									className="mt-2 bg-white text-black font-semibold text-center py-2 rounded-xl hover:bg-gray-200 transition"
								>
									Entrar na Sala
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default FeaturedRooms;
