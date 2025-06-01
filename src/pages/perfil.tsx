import { useState } from "react"
import { User, Bell, KeyIcon } from "@phosphor-icons/react"
import { SimpleNav } from "@/components/SimpleNav"

export default function ProfilePage() {
  const [name, setName] = useState("João Silva")
  const [email, setEmail] = useState("joao@email.com")
  const [bio, setBio] = useState("Desenvolvedor interessado em IA")
  const [notifications, setNotifications] = useState(true)

  const stats = [
    { label: "Salas", value: "24" },
    { label: "Horas", value: "156h" },
    { label: "Ideias", value: "89" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNav />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Perfil</h1>
          <p className="text-gray-600">Suas informações e configurações</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2">
            <div>
              <div>
                <h2 className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name">Nome</label>
                  <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="bio">Bio</label>
                  <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
                </div>

                <button>Salvar</button>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <h2 className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Convites para salas</div>
                    <div className="text-sm text-gray-600">Receber notificações de convites</div>
                  </div>
                  <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Novas mensagens</div>
                    <div className="text-sm text-gray-600">Notificações de chat</div>
                  </div>
                  <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <h2 className="flex items-center gap-2">
                  <KeyIcon className="h-5 w-5" />
                  Configurações
                </h2>
              </div>
              <div className="space-y-3">
                <button className="w-full">
                  Alterar Senha
                </button>
                <button className="w-full">
                  Exportar Dados
                </button>
                <button className="w-full">
                  Excluir Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
