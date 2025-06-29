import { useState } from "react";
import Image from "next/image";
import { Publicacion } from "@/lib/publicacion";
import Modal from "./Modal"; // Asegurate de que el path sea correcto
import ModalCarrusel from "./ModalCarrusel"; // Asegurate de que el path sea correcto

export default function PubliCard({ publicacion }: { publicacion: Publicacion }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    marca,
    modelo,
    anio,
    km
  } = publicacion.datos_extra as {
    marca?: string;
    modelo?: string;
    anio?: number;
    km?: string;
  };

  const imagenes = publicacion.imagenUrls && publicacion.imagenUrls.length > 0
    ? publicacion.imagenUrls.map(img => `http://localhost:5000/api/uploads/${img}`)
    : ["/placeholder.jpg"];

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] mb-6"
      >
        <div className="flex flex-col md:flex-row">
          <div className="p-4 flex-1">
            <h3 className="text-[22px] font-semibold text-gray-800 mb-2">
              {marca || publicacion.titulo} {modelo && `- ${modelo}`}
            </h3>
            {anio && <p className="text-gray-800 text-[16px] mt-1">Año: {anio}</p>}
            {km && <p className="text-gray-800 text-[16px] mt-1">KM: {km}</p>}
            <p className="text-gray-800 font-bold text-[20px] mt-1">Precio: ${publicacion.precio}</p>
            <p className="text-gray-800 text-[16px] mt-3">*{publicacion.ubicacion}</p>
          </div>

          <div className="md:w-64 h-full aspect-[4/3] relative">
            <Image
              src={imagenes[0]}
              alt={publicacion.titulo}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={publicacion.titulo}>
        <ModalCarrusel imagenes={publicacion.imagenUrls ?? []} />
        <p className="mb-2"><strong>Descripción:</strong> {publicacion.descripcion}</p>
        <p className="mb-2"><strong>Ubicacion:</strong> {publicacion.ubicacion}</p>
        {anio && <p className="mb-2"><strong>Año:</strong> {anio}</p>}
        {km && <p className="mb-2"><strong>Kilómetros:</strong> {km}</p>}
        {marca && <p className="mb-2"><strong>Marca:</strong> {marca}</p>}
        {modelo && <p className="mb-2"><strong>Modelo:</strong> {modelo}</p>}
      </Modal>
    </>
  );
}
