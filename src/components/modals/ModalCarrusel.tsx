"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ModalCarrusel({ imagenes }: { imagenes: string[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + imagenes.length) % imagenes.length);
  const next = () => setIndex((index + 1) % imagenes.length);

  return (
    <div className="relative w-full h-64 sm:h-96 bg-black rounded-md overflow-hidden">
      <Image
        src={`http://localhost:5000/api/uploads/${imagenes[index]}`}
        alt={`Imagen ${index + 1}`}
        fill
        className="object-contain"
      />
      {imagenes.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      <div className="absolute bottom-2 right-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
        {index + 1}/{imagenes.length}
      </div>
    </div>
  );
}
