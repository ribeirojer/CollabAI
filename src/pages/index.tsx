import FeaturedRooms from "@/components/FeaturedRooms";
import Header from "@/components/Header";
import { StatsSection } from "@/components/StatsSection";
import { PlusIcon, SparkleIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
			<Header />
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
						<SparkleIcon className="h-4 w-4" />
						Colaboração Inteligente em Tempo Real
					</div>

					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
						Bem-vindo(a) ao{" "}
						<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							Futuro
						</span>
						<br />
						da Colaboração
					</h1>

					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Colabore com IA e outras pessoas em tempo real. Brainstorming,
						projetos, educação e muito mais.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							href="/criar"
							aria-label="Criar nova sala"
							className="inline-flex gap-4 items-center justify-center px-6 py-3 text-lg font-medium text-white rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors"
						>
							<PlusIcon className="h-5 w-5" />
							Criar Nova Sala
						</Link>
					</div>
				</div>

				<StatsSection />

				<FeaturedRooms />

				<div className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
					<h3 className="text-2xl font-bold mb-4">Pronto para Colaborar?</h3>
					<p className="text-purple-100 mb-6 max-w-2xl mx-auto">
						Crie sua primeira sala e experimente o poder da colaboração
						assistida por IA
					</p>
					<Link
						href="/criar"
						aria-label="Criar minha primeira sala"
						className="bg-slate-50 px-6 py-3 rounded-lg hover:bg-slate-200 font-base text-black flex justify-center items-center gap-2 transition-colors"
					>
						<PlusIcon className="h-5 w-5" />
						Criar Minha Primeira Sala
					</Link>
				</div>
			</main>
		</div>
	);
}
