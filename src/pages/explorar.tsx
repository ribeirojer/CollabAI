import Layout from "@/components/Layout";
import type { Room } from "@/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
            Explorar Salas
          </h1>
          <p className="text-gray-500 text-lg">
            Descubra ambientes de colaboração e interação.
          </p>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhuma sala encontrada.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group border border-slate-500 rounded-3xl p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                  <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {room.name}
                  </h2>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {room.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase font-medium tracking-wide">
                    {room.type}
                  </span>

                  <Link
					href={`/sala/${room.id}`}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                  >
                    Entrar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
