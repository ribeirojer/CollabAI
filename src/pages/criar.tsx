import React, { useState } from "react"
import { Lightbulb, Code, GraduationCap, Globe, Lock, Plus, X, LightningAIcon } from "@phosphor-icons/react"
import { SimpleNav } from "@/components/SimpleNav"

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState("")
  const [description, setDescription] = useState("")
  const [roomType, setRoomType] = useState("brainstorming")
  const [isPublic, setIsPublic] = useState(true)
  const [maxParticipants, setMaxParticipants] = useState("20")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [inviteEmails, setInviteEmails] = useState<string[]>([])
  const [newEmail, setNewEmail] = useState("")

  const types = [
    { id: "brainstorming", name: "Brainstorming", desc: "Gerar ideias" },
    { id: "projeto", name: "Projeto", desc: "Desenvolver junto" },
    { id: "educacao", name: "Educação", desc: "Aprender junto" },
    { id: "hackathon", name: "Hackathon", desc: "Competir" },
  ]

  const handleCreateRoom = () => {
    if (roomName.trim() && description.trim()) {
      // Aqui seria a lógica para criar a sala
      console.log({
        roomName,
        description,
        roomType,
        isPublic,
        maxParticipants,
        tags,
        inviteEmails,
      })
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addEmail = () => {
    if (newEmail.trim() && !inviteEmails.includes(newEmail.trim())) {
      setInviteEmails([...inviteEmails, newEmail.trim()])
      setNewEmail("")
    }
  }

  const removeEmail = (emailToRemove: string) => {
    setInviteEmails(inviteEmails.filter((email) => email !== emailToRemove))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SimpleNav />

      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Criar Nova Sala</h1>
            <p className="text-gray-600">Configure sua sala de colaboração</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div>
                <div>
                  <h2>Informações Básicas</h2>
                  <p>Defina o nome e descrição da sua sala</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="roomName">Nome da Sala</label>
                    <input
                      id="roomName"
                      placeholder="Ex: Brainstorming App Mobile"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Descrição</label>
                    <textarea
                      id="description"
                      placeholder="Descreva o objetivo e contexto da colaboração..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Room Type */}
              <div>
                <div>
                  <h2>Tipo de Sala</h2>
                  <p>Escolha o formato que melhor se adequa ao seu objetivo</p>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {types.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          roomType === type.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setRoomType(type.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-yellow-100 text-yellow-800">
                            {type.id === "brainstorming" && <Lightbulb className="h-4 w-4" />}
                            {type.id === "projeto" && <Code className="h-4 w-4" />}
                            {type.id === "educacao" && <GraduationCap className="h-4 w-4" />}
                            {type.id === "hackathon" && <LightningAIcon className="h-4 w-4" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{type.name}</h4>
                            <p className="text-sm text-muted-foreground">{type.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <div>
                  <h2>Tags</h2>
                  <p>Adicione tags para facilitar a descoberta da sala</p>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      placeholder="Adicionar tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <button onClick={addTag} >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Sidebar */}
            <div className="space-y-6">
              {/* Privacy & Limits */}
              <div>
                <div>
                  <h2>Configurações</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isPublic ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      <label>Sala Pública</label>
                    </div>
                    {/*<Switch checked={isPublic} onCheckedChange={setIsPublic} />*/}
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="maxParticipants">Máximo de Participantes</label>
                    <input
                      id="maxParticipants"
                      type="number"
                      value={maxParticipants}
                      onChange={(e) => setMaxParticipants(e.target.value)}
                      min="2"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              {/* Invites */}
              <div>
                <div>
                  <h2>Convidar Participantes</h2>
                  <p>Convide pessoas específicas para a sala</p>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      placeholder="email@exemplo.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addEmail()}
                    />
                    <button onClick={addEmail} >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {inviteEmails.map((email) => (
                      <div key={email} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6">
                            <span className="text-xs">{email.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="text-sm">{email}</span>
                        </div>
                        <button onClick={() => removeEmail(email)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Create button */}
              <button
                className="w-full"
                onClick={handleCreateRoom}
                disabled={!roomName.trim() || !description.trim()}
              >
                Criar Sala
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
