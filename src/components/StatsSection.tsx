import {
	ChatIcon,
	ClockIcon,
	LightbulbIcon,
	TrendUpIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import React from "react";

export const StatsSection = () => {
	const stats = [
		{
			label: "Salas Ativas",
			value: "12",
			icon: ChatIcon,
			color: "text-blue-600",
			bgColor: "bg-blue-100",
			change: "+3 hoje",
		},
		{
			label: "Colaboradores Online",
			value: "48",
			icon: UsersIcon,
			color: "text-green-600",
			bgColor: "bg-green-100",
			change: "+12 esta semana",
		},
		{
			label: "Ideias Geradas",
			value: "324",
			icon: LightbulbIcon,
			color: "text-yellow-600",
			bgColor: "bg-yellow-100",
			change: "+23 hoje",
		},
		{
			label: "Horas Colaboradas",
			value: "156h",
			icon: ClockIcon,
			color: "text-purple-600",
			bgColor: "bg-purple-100",
			change: "+8h esta semana",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
			{stats.map((stat) => (
				<div
					key={stat.label}
					className="flex flex-col items-center justify-center md:items-start p-5 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
				>
					<div className="flex items-center gap-4">
						<div className={`p-3 rounded-full ${stat.bgColor}`}>
							<stat.icon className={`h-6 w-6 ${stat.color}`} />
						</div>
						<div>
							<p className="text-2xl font-semibold text-gray-800">
								{stat.value}
							</p>
							<p className="text-sm text-gray-500">{stat.label}</p>
						</div>
					</div>
					<div className="flex items-center gap-2 mt-3 text-xs text-green-600">
						<TrendUpIcon className="h-4 w-4" />
						<span>{stat.change}</span>
					</div>
				</div>
			))}
		</div>
	);
};
