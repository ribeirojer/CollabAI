import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("User" + Math.floor(Math.random() * 1000));

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel('realtime:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload: any) => {
        setMessages((prev: any[]) => [...prev, payload.new]);
        console.log('New message received:', payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('inserted_at', { ascending: true });

    if (!error) {
      setMessages(data);
    }
  }

  async function sendMessage() {
    console.log('Sending message:', newMessage);
    if (newMessage.trim() === '') return;
    if (!username.trim())       return;
      console.log('Username:', username);

    const { error } = await supabase.from('messages').insert({
      content: newMessage,
      username
    })

    if (!error) {
      // Chamar API para resposta automática
      await fetch('/api/chat-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage, username, persona: 'Moderador' })
      })


      console.log('Message sent successfully:', newMessage);
      
      setNewMessage('');
    }  
    else {
      console.error('Error sending message:', error);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">

<div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input
          className="border p-2 w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Seu nome"
        />
        <div className="h-64 overflow-y-auto border p-2 mb-2">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-1">
              <strong>{msg.username}: </strong>{msg.content}
            </div>
          ))}
        </div>
        <input
          className="border p-2 w-full mb-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white p-2 w-full"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>    </main>
  );
}
