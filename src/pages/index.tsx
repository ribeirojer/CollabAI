import { SimpleNav } from "@/components/SimpleNav"
import { PlusIcon, UsersIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react"

export default function HomePage() {
  const recentRooms = [
    { id: 1, name: "Brainstorming App", participants: 5, status: "Ativa" },
    { id: 2, name: "Projeto Web", participants: 3, status: "Ativa" },
    { id: 3, name: "Aula React", participants: 12, status: "Finalizada" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNav />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo!</h1>
          <p className="text-gray-600">Colabore com IA e outras pessoas em tempo real</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="p-6 text-center">
              <PaperPlaneTiltIcon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Salas Ativas</div>
            </div>
          </div>

          <div>
            <div className="p-6 text-center">
              <UsersIcon className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">48</div>
              <div className="text-sm text-gray-600">Colaboradores</div>
            </div>
          </div>

          <div>
            <div className="p-6 text-center">
              <PlusIcon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <button className="w-full mt-2">Nova Sala</button>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2>Suas Salas Recentes</h2>
          </div>
          <div>
            <div className="space-y-3">
              {recentRooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium">{room.name}</div>
                    <div className="text-sm text-gray-600">{room.participants} participantes</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        room.status === "Ativa" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {room.status}
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Entrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
