# CollabAI

Chat em grupo com participação de IA generativa — submissão para o hackathon da Adapta.

**Demo:** https://collab-ai-theta.vercel.app

> ![Demo do CollabAI](docs/demo.png)
> *(adicione um print ou GIF da sala em `docs/demo.png`)*

Cada sala tem uma **persona de IA** (moderador, criativo, analista ou mentor) que acompanha a conversa e responde com base nas mensagens recentes, via OpenAI.

## Stack

- **Next.js 15** (Pages Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + Phosphor Icons
- **Supabase** (PostgreSQL — tabelas `rooms` e `messages`)
- **OpenAI** `gpt-4o-mini` (via REST, sem SDK)
- **Vitest** (testes) + **Biome** (lint/format)

## Como funciona

```text
Usuários conversam na sala (Supabase)
   ↓
POST /api/chat-reply { roomId }
   ↓
Busca sala + mensagens recentes
   ↓
Monta system prompt da persona (moderador|criativo|analista|mentor)
   ↓
OpenAI gpt-4o-mini → resposta salva como mensagem da IA
```

## Funcionalidades

- 🧑‍🤝‍🧑 Salas de chat em grupo (públicas/privadas, com tipos)
- 🤖 Resposta automática da IA com persona configurável por sala
- ⭐ Salas em destaque + estatísticas
- 👤 Perfil com nome de usuário persistido
- ✅ Testes com Vitest (`test/room.spec.ts`)

## Como rodar

```bash
npm install
npm run dev   # http://localhost:3000
```

### Variáveis de ambiente

Crie um arquivo `.env.local`:

```env
OPENAI_API_KEY=sua-openai-key
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

O projeto Supabase precisa das tabelas `rooms` e `messages` (ver `src/repositories/`).

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Dev com Turbopack |
| `npm run build` / `npm start` | Build / produção |
| `npm run test:watch` | Testes em watch |
| `npm run test:coverage` | Testes com cobertura |
| `npm run lint` | Biome check + fix |

## Estrutura

```text
src/
  pages/            index, criar, perfil, sala/[id]
  pages/api/        chat-reply (OpenAI), rooms (CRUD)
  components/       Chat, MessageList, MessageInput, ChatRoom/*, ...
  repositories/     rooms.ts, messages.ts (camada Supabase)
  hooks/            useChat, useUsername
  utils/            system prompt, formatação, chamada OpenAI
  interfaces.ts     Room, Persona, Message
test/               room.spec.ts (vitest)
```

## Licença

Sem arquivo de licença no momento — considere adicionar `LICENSE` (ex: MIT).
