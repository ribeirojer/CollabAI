import type React from "react";
import Input from "./Input";
import { RoomTypeSelector } from "./RoomTypeSelector";
import { RoomVisibility } from "./RoomVisibility";
import Textarea from "./Textarea";

export interface MainFormProps {
	room: {
		name: string;
		description: string;
		roomType: string;
		isPublic: boolean;
		maxParticipants: number;
		password: string;
	};
	setRoom: React.Dispatch<React.SetStateAction<MainFormProps["room"]>>;
	errors: {
		name: string;
		description: string;
		roomType: string;
		isPublic: string;
		maxParticipants: string;
		password: string;
	};
	refs: {
		roomName: React.RefObject<HTMLInputElement | null>;
		description: React.RefObject<HTMLTextAreaElement | null>;
		roomType: React.RefObject<HTMLSelectElement | null>;
		maxParticipants: React.RefObject<HTMLInputElement | null>;
		password: React.RefObject<HTMLInputElement | null>;
	};
}

export const MainForm = ({ room, setRoom, errors, refs }: MainFormProps) => {
	return (
		<div className="space-y-10">
			<div className="space-y-4">
				<Input
					error={errors.name}
					inputRef={refs.roomName}
					label="Nome da Sala"
					placeholder="Ex: Brainstorming de Ideias"
					onChange={(e) => setRoom({ ...room, name: e.target.value })}
					value={room.name}
					id="roomName"
					type="text"
					maxLength={50}
				/>
				<Textarea
					error={errors.description}
					label="Descrição"
					placeholder="Descreva o objetivo e contexto da colaboração..."
					onChange={(e) => setRoom({ ...room, description: e.target.value })}
					value={room.description}
					id="description"
					rows={4}
					maxLength={500}
					textareaRef={refs.description}
					aria-describedby="descriptionHelp"
				/>
			</div>
			<RoomTypeSelector
				roomType={room.roomType}
				setRoomType={(roomType) => setRoom({ ...room, roomType })}
				error={errors.roomType}
			/>
			<RoomVisibility
				room={room}
				setRoom={setRoom}
				errors={errors}
				passwordRef={refs.password}
			/>
		</div>
	);
};
