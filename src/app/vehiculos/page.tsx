"use client";
import React, { useEffect, useState } from "react";
import VehiculoCard from "@/components/VehiculoCard";
import axios from "@/services/api";
import { Vehiculo } from "@/lib/vehiculo";

export default function VehiculosPage() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  useEffect(() => {
    axios.get<Vehiculo[]>("/vehiculos")
      .then((res) => {
        console.log("Datos recibidos:", res.data);
        setVehiculos(res.data);
      })
      .catch((err: unknown) => console.error(err));
  }, []);

  return (
    <main className="px-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Vehículos en venta</h1>
      <div className="space-y-6 max-w-2xl mx-auto">
        {vehiculos.map((v) => (
          <VehiculoCard key={v.id} vehiculo={v} />
        ))}
      </div>
    </main>
  );
}

