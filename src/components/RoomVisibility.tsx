import { GlobeIcon, LockIcon } from "@phosphor-icons/react";
import Input from "./Input";
import type { MainFormProps } from "./MainForm";

export const RoomVisibility = ({
	room,
	setRoom,
	errors,
	passwordRef,
}: {
	room: MainFormProps["room"];
	setRoom: MainFormProps["setRoom"];
	errors: {
		name: string;
		description: string;
		roomType: string;
		isPublic: string;
		maxParticipants: string;
		password: string;
	};
	passwordRef: React.RefObject<HTMLInputElement | null>;
}) => {
	return (
		<section className="space-y-6">
			<Input
				label="Máximo de Participantes"
				placeholder="Defina o número máximo de participantes"
				onChange={(e) =>
					setRoom({
						...room,
						maxParticipants: Math.min(Number(e.target.value), 20),
					})
				}
				value={room.maxParticipants.toString()}
				id="maxParticipants"
				type="number"
				max={20}
				min={1}
				error={errors.maxParticipants}
			/>

			<div className="flex justify-between items-center p-4 rounded-lg shadow-sm">
				<div className="flex items-center gap-3">
					{room.isPublic ? (
						<GlobeIcon size={24} weight="duotone" className="text-purple-600" />
					) : (
						<LockIcon size={24} weight="duotone" className="text-gray-600" />
					)}
					<span className="text-gray-700 font-medium">
						{room.isPublic ? "Sala Pública" : "Sala Privada"}
					</span>
				</div>

				<div className="flex gap-2">
					<button
						type="button"
						className={`pointer px-4 py-2 rounded-lg border text-sm font-medium ${
							room.isPublic
								? "bg-purple-600 text-white"
								: "bg-white text-gray-700 border-gray-300"
						}`}
						onClick={() => setRoom({ ...room, isPublic: true })}
					>
						Pública
					</button>
					<button
						type="button"
						className={`pointer px-4 py-2 rounded-lg border text-sm font-medium ${
							!room.isPublic
								? "bg-gray-600 text-white"
								: "bg-white text-gray-700 border-gray-300"
						}`}
						onClick={() => setRoom({ ...room, isPublic: false })}
					>
						Privada
					</button>
				</div>
			</div>
			{errors.isPublic && (
				<p className="text-red-600 text-sm mt-2">{errors.isPublic}</p>
			)}

			{/* Senha */}
			{!room.isPublic && (
				<Input
					label="Senha de Acesso"
					placeholder="Digite uma senha para acesso restrito"
					onChange={(e) => setRoom({ ...room, password: e.target.value })}
					value={room.password}
					id="password"
					type="password"
					maxLength={20}
					error={errors.password}
					inputRef={passwordRef}
				/>
			)}
		</section>
	);
};
