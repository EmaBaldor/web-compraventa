import Image from "next/image";
import { Vehiculo } from "@/lib/vehiculo";

export default function VehiculoCard({ vehiculo }: { vehiculo: Vehiculo }) {
  const imagenValida =
    vehiculo.imagenUrl && vehiculo.imagenUrl.trim() !== ""
      ? `http://localhost:5000/api/uploads/${vehiculo.imagenUrl}`
      : "/placeholder.jpg";

  return (
<div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] mb-6">
      <div className="flex flex-col md:flex-row">
        {/* Texto a la izquierda */}
        <div className="p-4 flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {vehiculo.marca} {vehiculo.modelo}
          </h3>
          <p className="text-gray-600">Año: {vehiculo.anio}</p>
          <p className="text-gray-600">KM: {vehiculo.km}</p>
          <p className="text-gray-800 font-bold text-lg mt-2">Precio: ${vehiculo.precio}</p>
          <p className="text-gray-500 mt-3">{vehiculo.descripcion}</p>
        </div>

        {/* Imagen a la derecha */}
        <div className="md:w-64 h-48 relative">
          <Image
            src={imagenValida}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
