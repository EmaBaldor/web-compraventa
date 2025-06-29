// src/app/page.tsx
"use client";
import React from "react";
import CategoryCard from "@/components/CategoryCard";

const categoria = [
  { title: "Autos",        image: "/autos.jpg",     href: "/publicaciones/vehiculos" },
  { title: "Motos",        image: "/motos.jpg",     href: "/publicaciones/motos" },
  { title: "Inmuebles",    image: "/inmuebles.jpg", href: "/publicaciones/inmuebles" },
  { title: "Otros rubros", image: "/otros.jpg",     href: "/publicaciones/otros" },
];

export default function Home() {
  return (
    <main className="pt-16 px-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Categorías</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categoria.map(cat => (
          <CategoryCard
            key={cat.title}
            title={cat.title}
            imageSrc={cat.image}
            href={cat.href}
          />
        ))}
      </div>
    </main>
  );
}

