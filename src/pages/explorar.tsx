import { useState } from "react"
import { MagnifyingGlassIcon, Users } from "@phosphor-icons/react"
import { SimpleNav } from "@/components/SimpleNav"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const rooms = [
    {
      id: 1,
      name: "IA na Saúde",
      description: "Brainstorming sobre aplicações médicas",
      participants: 8,
      type: "Brainstorming",
    },
    {
      id: 2,
      name: "App Sustentável",
      description: "Desenvolvimento de app ecológico",
      participants: 5,
      type: "Projeto",
    },
    {
      id: 3,
      name: "Curso Python",
      description: "Aula básica de programação",
      participants: 15,
      type: "Educação",
    },
    {
      id: 4,
      name: "Hackathon FinTech",
      description: "48h de desenvolvimento",
      participants: 25,
      type: "Hackathon",
    },
  ]

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNav />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Explorar Salas</h1>
          <p className="text-gray-600">Encontre salas para colaborar</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Buscar salas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredRooms.map((room) => (
            <div key={room.id} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h2 className="text-lg">{room.name}</h2>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{room.type}</span>
              </div>
              <div>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    {room.participants} pessoas
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma sala encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}
