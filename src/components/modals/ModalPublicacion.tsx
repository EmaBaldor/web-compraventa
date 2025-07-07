"use client";
import { useEffect } from "react";
import Modal from "./Modal";
import FormPublicacion from "../forms/Form";
import ModalCarrusel from "./ModalCarrusel";
import { Publicacion } from "@/lib/publicacion";

type ModalPublicacionProps = {
  isOpen: boolean;
  modo: "ver" | "editar" | "crear" | null;
  onClose: () => void;
  publicacion?: Publicacion;
};

export default function ModalPublicacion({ isOpen, modo, onClose, publicacion }: ModalPublicacionProps) {
  const titulo =
    modo === "crear" ? "Nueva publicación" :
    modo === "editar" ? "Editar publicación" :
    publicacion?.titulo ?? "Detalle";

useEffect(() => {
  if (isOpen) {
    // Bloquea scroll del body
    document.body.style.overflow = 'hidden';
  } else {
    // Restaura scroll
    document.body.style.overflow = '';
  }
  // Limpieza si se desmonta el componente
  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {titulo && <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">{titulo}</h2>}
      {modo === "ver" && publicacion && (
        <>
          <ModalCarrusel imagenes={publicacion.imagenUrls ?? []} />
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-8 pt-4">
              <div className="text-left flex-1">
                <p className="mb-2"><strong>Descripción:</strong> {publicacion.descripcion}</p>
                <p className="mb-2"><strong>Ubicación:</strong> {publicacion.ubicacion}</p>
                <p className="mb-2"><strong>Precio:</strong> ${publicacion.precio}</p>
              </div>

              <div className="text-right flex-1">
                {publicacion.datos_extra?.anio && <p className="mb-2"><strong>Año:</strong> {publicacion.datos_extra.anio}</p>}
                {publicacion.datos_extra?.km && <p className="mb-2"><strong>Kilómetros:</strong> {publicacion.datos_extra.km}</p>}
                {publicacion.datos_extra?.marca && <p className="mb-2"><strong>Marca:</strong> {publicacion.datos_extra.marca}</p>}
                {publicacion.datos_extra?.modelo && <p className="mb-2"><strong>Modelo:</strong> {publicacion.datos_extra.modelo}</p>}
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("editar-publicacion", { detail: publicacion }))}
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Editar publicación
                </button>
              </div>
            </div>
        </>
      )}

      {(modo === "editar" || modo === "crear") && (
        <FormPublicacion
          modoEdicion={modo === "editar"}
          id={modo === "editar" ? publicacion?.id : undefined}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}
