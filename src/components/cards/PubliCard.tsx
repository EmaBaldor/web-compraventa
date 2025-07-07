import { useState, useEffect } from "react";
import Image from "next/image";
import { Publicacion } from "@/lib/publicacion";
import ModalPublicacion from "../modals/ModalPublicacion";
import { MapPin, DollarSign, Calendar, Gauge } from "lucide-react";


export default function PubliCard({ publicacion }: { publicacion: Publicacion }) {
  const [modo, setModo] = useState<"ver" | "editar" | null>(null);

  useEffect(() => {
    const handleEditar = (e: CustomEvent<Publicacion>) => {
      if (e.detail.id === publicacion.id) {
        setModo("editar");
      }
    };

    window.addEventListener("editar-publicacion", handleEditar as EventListener);
    return () => window.removeEventListener("editar-publicacion", handleEditar as EventListener);
  }, [publicacion.id]);

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
        onClick={() => setModo("ver")}
        className="cursor-pointer max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] mb-6"
      >
        <div className="flex flex-col md:flex-row">
          <div className="p-4 flex-1">
            <h3 className="text-[18px] font-semibold text-gray-800 mb-2">
              {marca || publicacion.titulo} {modelo && `- ${modelo}`}
            </h3>
            <div className="flex items-center gap-2 text-gray-800 font-bold text-[18px] mt-1">
              <DollarSign size={16} />
              <span>{publicacion.precio}</span>
            </div>
            {anio && <div className="flex items-center gap-2 text-gray-800 text-[14px] mt-1">
              <Calendar size={15} />
              <span>{anio}</span>
            </div>}
              {km && (
              <div className="flex items-center gap-2 text-gray-800 text-[14px] mt-1">
                <Gauge  size={15} />
                <span>{km} Km</span>
              </div>
              )}
              <div className="flex items-center gap-2 text-gray-800 text-[14px] mt-3">
              <MapPin size={16} />
              <span>{publicacion.ubicacion}</span>
            </div>
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

      {modo && (
        <ModalPublicacion
          isOpen={!!modo}
          onClose={() => setModo(null)}
          modo={modo}
          publicacion={publicacion}
        />
      )}
    </>
  );
}
