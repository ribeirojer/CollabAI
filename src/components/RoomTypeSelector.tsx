import {
	BrainIcon,
	ChartScatterIcon,
	PaletteIcon,
	ScalesIcon,
} from "@phosphor-icons/react";

interface RoomTypeSelectorProps {
	roomType: string;
	setRoomType: (roomType: string) => void;
	error: string;
}

const persona = [
	{
		id: "moderator",
		name: "Moderador",
		desc: "Facilita discussões e organiza ideias.",
		icon: <ScalesIcon size={32} weight="duotone" />,
	},
	{
		id: "criativo",
		name: "Criativo",
		desc: "Sugere ideias inovadoras e conexões.",
		icon: <PaletteIcon size={32} weight="duotone" />,
	},
	{
		id: "analista",
		name: "Analista",
		desc: "Foca em dados e análise crítica.",
		icon: <ChartScatterIcon size={32} weight="duotone" />,
	},
	{
		id: "mentor",
		name: "Mentor",
		desc: "Oferece orientação e feedback construtivo.",
		icon: <BrainIcon size={32} weight="duotone" />,
	},
];

export const RoomTypeSelector = ({
	roomType,
	setRoomType,
	error,
}: RoomTypeSelectorProps) => {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-2 text-gray-800">
				Tipo de Sala
			</h2>
			<p className="text-sm text-gray-500 mb-6">
				Escolha o formato que melhor se adequa ao seu objetivo.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{persona.map((type) => (
					<div
						key={type.id}
						className={`flex items-start p-4 border rounded-xl cursor-pointer transition shadow-sm
              ${roomType === type.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50 border-gray-200"}`}
						onClick={() => setRoomType(type.id)}
					>
						<div
							className={`flex items-center justify-center p-3 rounded-md mr-4 
                ${roomType === type.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
						>
							{type.icon}
						</div>
						<div>
							<h4 className="font-semibold text-gray-800">{type.name}</h4>
							<p className="text-sm text-gray-500">{type.desc}</p>
						</div>
					</div>
				))}
			</div>
			{error && (
				<p className="text-red-500 mt-2">
					Selecione o tipo de sala que melhor se adapta ao seu objetivo. Você
					pode mudar isso depois, se necessário.
				</p>
			)}
		</div>
	);
};
