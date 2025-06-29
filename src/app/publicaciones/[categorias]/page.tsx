"use client";
import React, { useEffect, useState } from "react";
import PubliCard from "@/components/PubliCard";
import axios from "@/services/api";
import { Publicacion } from "@/lib/publicacion";
import { useParams } from "next/navigation";

export default function PublicacionesPage() {
  const params = useParams();
  console.log(params.categorias);
  const categoria = typeof params.categorias === "string" ? params.categorias : ""; // Validamos

  const [items, setItems] = useState<Publicacion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoria) return;

    axios
      .get<Publicacion[]>(`/publicaciones/${categoria}`)
      .then((res) => {
        setItems(res.data);
        setError(null);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la categoría.");
        console.log(err)
      });
  }, [categoria]);

  return (
    <main className="px-4 bg-gray-800 min-h-screen pt-10">
      <h2 className="text-2xl font-bold mb-4 capitalize text-center">
        {categoria}
      </h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <div className="space-y-6 max-w-2xl mx-auto">
        {items.map((item) => (
          <PubliCard key={item.id} publicacion={item} />
        ))}
      </div>
    </main>
  );
}
