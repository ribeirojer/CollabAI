import Layout from "@/components/Layout";
import Paragraf from "@/components/Paragraf";
import Title from "@/components/Title";
import { PaperPlaneTiltIcon, PlusIcon, UsersIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function HomePage() {
	return (
		<Layout>
			<div className="max-w-4xl mx-auto p-6">
				<Title>Bem-vindo(a)!</Title>
				<Paragraf>Colabore com IA e outras pessoas em tempo real</Paragraf>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
					<div className="p-6 text-center bg-white shadow-md rounded-lg">
						<PaperPlaneTiltIcon className="h-10 w-10 mx-auto mb-3 text-purple-600" />
						<div className="text-3xl font-extrabold text-gray-800">12</div>
						<div className="text-sm text-gray-500">Salas Ativas</div>
					</div>
					<div className="p-6 text-center bg-white shadow-md rounded-lg">
						<UsersIcon className="h-10 w-10 mx-auto mb-3 text-purple-600" />
						<div className="text-3xl font-extrabold text-gray-800">48</div>
						<div className="text-sm text-gray-500">Colaboradores</div>
					</div>
				</div>
				<Link
					href="/criar"
					className="p-6 text-center bg-white shadow-md rounded-lg"
				>
					<PlusIcon className="h-10 w-10 mx-auto mb-3 text-purple-600" />
					<button className="w-full mt-3 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
						Nova Sala
					</button>
				</Link>
			</div>
		</Layout>
	);
}
