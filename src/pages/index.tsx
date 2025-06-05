import { Room } from "@/interfaces";
import { useState, useEffect, SetStateAction } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  UsersIcon,
  ChatIcon,
  ClockIcon,
  TrendUpIcon,
  LightbulbIcon,
  CodeIcon,
  GraduationCapIcon,
  LightningAIcon,
  ArrowRightIcon,
  SparkleIcon,
  RobotIcon,
} from "@phosphor-icons/react"
import Title from "@/components/Title";
import Paragraf from "@/components/Paragraf";

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
	const fetchRooms = async () => {
	  const response = await fetch("/api/rooms");
	  const data = await response.json();
	  setRooms(data);
	};

	fetchRooms();
  }, []);

  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    {
      label: "Salas Ativas",
      value: "12",
      icon: ChatIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+3 hoje",
    },
    {
      label: "Colaboradores Online",
      value: "48",
      icon: UsersIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12 esta semana",
    },
    {
      label: "Ideias Geradas",
      value: "324",
      icon: LightbulbIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "+23 hoje",
    },
    {
      label: "Horas Colaboradas",
      value: "156h",
      icon: ClockIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+8h esta semana",
    },
  ]

  const featuredRooms = [
    {
      id: 1,
      name: "Ideias sobre Hackathon",
      description: "Brainstorming para o hackathon da Adapta",
      type: "hackathon",
      participants: 8,
      is_active: "Ativo",
      host: "Maria Silva",
      tags: ["FinTech", "IA", "Inovação"],
      aiActive: true,
      lastActivity: "2 min atrás",
    },
    {
      id: 2,
      name: "Desenvolvimento App Sustentável",
      description: "Projeto colaborativo para app de sustentabilidade urbana",
      type: "projeto",
      participants: 12,
      is_active: "Ativo",
      host: "João Santos",
      tags: ["React", "Sustentabilidade", "Mobile"],
      aiActive: true,
      lastActivity: "5 min atrás",
    },
    {
      id: 3,
      name: "Curso: IA para Iniciantes",
      description: "Aula interativa sobre conceitos fundamentais de IA",
      type: "educacao",
      participants: 25,
      is_active: "Ativo",
      host: "Prof. Ana Costa",
      tags: ["Machine Learning", "Python", "Iniciante"],
      aiActive: true,
      lastActivity: "1 min atrás",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hackathon":
        return <LightningAIcon className="h-4 w-4" />
      case "projeto":
        return <CodeIcon className="h-4 w-4" />
      case "educacao":
        return <GraduationCapIcon className="h-4 w-4" />
      default:
        return <LightbulbIcon className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hackathon":
        return "bg-purple-100 text-purple-800"
      case "projeto":
        return "bg-blue-100 text-blue-800"
      case "educacao":
        return "bg-green-100 text-green-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
		{/* Header */}
		<header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
		  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="flex items-center justify-between h-16">
			  <div className="flex items-center gap-3">
				<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
				  <RobotIcon className="h-6 w-6 text-white" />
				</div>
				<span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
				  CollabAI
				</span>
			  </div>
  
			  <div className="flex items-center gap-3">
				<button className="gap-2">
				  <MagnifyingGlassIcon className="h-4 w-4" />
				  Explorar
				</button>
				<button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
				  <PlusIcon className="h-4 w-4" />
				  Criar Sala
				</button>
			  </div>
			</div>
		  </div>
		</header>
  
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		  {/* Hero Section */}
		  <div className="text-center mb-12">
			<div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
			  <SparkleIcon className="h-4 w-4" />
			  Colaboração Inteligente em Tempo Real
			</div>
  
			<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
			  Bem-vindo ao{" "}
			  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Futuro</span>
			  <br />
			  da Colaboração
			</h1>
  
			<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
			  Colabore com IA e outras pessoas em tempo real. Brainstorming, projetos, educação e muito mais.
			</p>
  
			{/* Quick Actions */}
			<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
			  <button
				className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
			  >
				<PlusIcon className="h-5 w-5" />
				Criar Nova Sala
			  </button>
			  <button className="gap-2">
				<MagnifyingGlassIcon className="h-5 w-5" />
				Explorar Salas
			  </button>
			</div>
		  </div>
  
		  {/* Stats Grid */}
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
			{stats.map((stat) => (
			  <div
				key={stat.label}
				className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
			  >
				<div className="p-6">
				  <div className="flex items-center justify-between mb-4">
					<div className={`p-3 rounded-xl ${stat.bgColor}`}>
					  <stat.icon className={`h-6 w-6 ${stat.color}`} />
					</div>
					<TrendUpIcon className="h-4 w-4 text-green-500" />
				  </div>
				  <div className="space-y-1">
					<p className="text-2xl font-bold text-gray-900">{stat.value}</p>
					<p className="text-sm font-medium text-gray-600">{stat.label}</p>
					<p className="text-xs text-green-600">{stat.change}</p>
				  </div>
				</div>
			  </div>
			))}
		  </div>
  
		  {/* Search Section */}
		  <div className="mb-8">
			<div className="relative max-w-2xl mx-auto">
			  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
			  <input
				placeholder="Buscar salas por nome, tópico ou tag..."
				value={searchTerm}
				onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
				className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
			  />
			</div>
		  </div>
  
		  {/* Featured Rooms */}
		  <div className="mb-12">
			<div className="flex items-center justify-between mb-6">
			  <div>
				<h2 className="text-2xl font-bold text-gray-900">Salas em Destaque</h2>
				<p className="text-gray-600">Descubra ambientes de colaboração ativos</p>
			  </div>
			  <button className="gap-2">
				Ver Todas
				<ArrowRightIcon className="h-4 w-4" />
			  </button>
			</div>
  
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			  {featuredRooms.map((room) => (
				<div
				  className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300"
				  key={room.id}
				  //className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
				>
				  <div className="pb-3">
					<div className="flex items-start justify-between mb-3">
					  <div className={`p-2 rounded-lg ${getTypeColor(room.type)}`}>{getTypeIcon(room.type)}</div>
					  <div className="flex items-center gap-2">
						{room.aiActive && (
						  <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
							<RobotIcon className="h-3 w-3" />
							IA Ativa
						  </div>
						)}
						<span
						  className={`text-xs px-2 py-1 rounded-full ${room.is_active === "Ativo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
						  style={{ textTransform: "capitalize" }}
						>
						  {room.is_active}
						</span>
					  </div>
					</div>
  
					<Title className="text-lg group-hover:text-purple-600 transition-colors">{room.name}</Title>
					<Paragraf className="line-clamp-2">{room.description}</Paragraf>
				  </div>
  
				  <div className="space-y-4">
					{/* Tags */}
					<div className="flex flex-wrap gap-1">
					  {room.tags.slice(0, 3).map((tag) => (
						<span key={tag} className="text-xs">
						  {tag}
						</span>
					  ))}
					</div>
  
					{/* Host */}
					<div className="flex items-center gap-2">
						<span className="text-xs bg-purple-100 text-purple-800">
						  {room.host
							.split(" ")
							.map((n) => n[0])
							.join("")}
						</span>
					  <span className="text-sm text-gray-600">por {room.host}</span>
					</div>
  
					{/* Stats */}
					<div className="flex items-center justify-between text-sm text-gray-500">
					  <div className="flex items-center gap-1">
						<UsersIcon className="h-3 w-3" />
						{room.participants} participantes
					  </div>
					  <div className="flex items-center gap-1">
						<ClockIcon className="h-3 w-3" />
						{room.lastActivity}
					  </div>
					</div>
  
					{/* Action button */}
					<button className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
					  Entrar na Sala
					</button>
				  </div>
				</div>
			  ))}
			</div>
		  </div>
  
		  {/* CTA Section */}
		  <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
			<h3 className="text-2xl font-bold mb-4">Pronto para Colaborar?</h3>
			<p className="text-purple-100 mb-6 max-w-2xl mx-auto">
			  Crie sua primeira sala e experimente o poder da colaboração assistida por IA
			</p>
			<button className="gap-2">
			  <PlusIcon className="h-5 w-5" />
			  Criar Minha Primeira Sala
			</button>
		  </div>
		</main>
	  </div>
	);
}
