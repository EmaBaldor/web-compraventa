"use client";
import React, { useState } from "react";
import axios from "@/services/api";

export default function Publicar() {
  const [categoria, setCategoria] = useState("vehiculo");
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    datos_extra: {},
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleExtraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      datos_extra: {
        ...form.datos_extra,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/publicaciones", {
      ...form,
      categoria,
      precio: parseFloat(form.precio),
    });
    alert("Publicación enviada");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4 text-gray-800">
      <select name="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} className="border p-2 w-full">
        <option value="vehiculo">Vehículo</option>
        <option value="moto">Moto</option>
        <option value="inmueble">Inmueble</option>
      </select>

      <input name="titulo" placeholder="Título" onChange={handleChange} required className="border p-2 w-full" />
      <input name="descripcion" placeholder="Descripción" onChange={handleChange} required className="border p-2 w-full" />
      <input name="precio" placeholder="Precio" type="number" onChange={handleChange} required className="border p-2 w-full" />

      {categoria === "vehiculo" && (
        <>
          <input name="anio" placeholder="Año" type="number" onChange={handleExtraChange} className="border p-2 w-full" />
          <input name="km" placeholder="Kilómetros" onChange={handleExtraChange} className="border p-2 w-full" />
        </>
      )}

      {categoria === "moto" && (
        <>
          <input name="anio" placeholder="Año" type="number" onChange={handleExtraChange} className="border p-2 w-full" />
          <input name="cilindrada" placeholder="Cilindrada (cc)" onChange={handleExtraChange} className="border p-2 w-full" />
        </>
      )}

      {categoria === "inmueble" && (
        <>
          <input name="metros2" placeholder="Metros cuadrados" onChange={handleExtraChange} className="border p-2 w-full" />
          <input name="ambientes" placeholder="Ambientes" onChange={handleExtraChange} className="border p-2 w-full" />
        </>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Publicar
      </button>
    </form>
  );
}
