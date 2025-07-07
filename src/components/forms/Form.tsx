"use client";
import React, { useState, useEffect } from "react";
import axios from "@/services/api";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

type Props = {
  modoEdicion?: boolean;
  id?: number;
  onClose?: () => void;
};

export default function FormularioPublicacion({ modoEdicion = false, id, onClose }: Props) {
    const [categoria, setCategoria] = useState("vehiculos");
    const [form, setForm] = useState({
      titulo: "",
      descripcion: "",
      precio: "",
      ubicacion: "",
      datos_extra: {} as Record<string, string>,
    });
    const [imagenes, setImagenes] = useState<File[]>([]);
    const [imagenesServidor, setImagenesServidor] = useState<string[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
      if (modoEdicion && id) {
        axios.get(`/publicaciones/id/${id}`).then(({ data }) => {
          setForm({
            titulo: data.titulo || "",
            descripcion: data.descripcion || "",
            precio: String(data.precio || ""),
            ubicacion: data.ubicacion || "",
            datos_extra: data.datos_extra || {},
          });
          setCategoria(data.categoria || "vehiculos");
          setImagenesServidor((data.imagenUrls || []).map((nombre: string) =>`http://localhost:5000/api/uploads/${nombre}`));
        });
      }
    }, [modoEdicion, id]);
    const handleImagenesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      const nuevasImagenes = [...imagenes, ...selectedFiles].slice(0, 5 - imagenesServidor.length);
      setImagenes(nuevasImagenes);
      setPreviewUrls(nuevasImagenes.map((file) => URL.createObjectURL(file)));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value ?? "" }));
    };
    const handleExtraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        datos_extra: { ...prev.datos_extra, [name]: value ?? "" },
      }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("titulo", form.titulo);
      formData.append("descripcion", form.descripcion);
      formData.append("precio", form.precio);
      formData.append("categoria", categoria);
      formData.append("ubicacion", form.ubicacion);
      formData.append("datos_extra", JSON.stringify(form.datos_extra));
      imagenes.forEach((img) => formData.append("imagenes", img));

      try {
        if (modoEdicion && id) {
            formData.append("imagenesExistentes", JSON.stringify(
              imagenesServidor.map((url) => {
                const parts = url.split("/");
                return parts[parts.length - 1];
              })
            ));

            await axios.put(`/publicaciones/id/${id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Publicación actualizada.");
            if (onClose) onClose();
          } else {
          await axios.post("/publicaciones", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Publicación creada.");
        }
      } catch (err) {
        console.error("Error al enviar:", err);
        alert("Hubo un error al procesar la publicación.");
      }
    };
    const eliminarImagenServidor = (index: number) => {
        setImagenesServidor((prev) => prev.filter((_, i) => i !== index));
    };
    const eliminarImagenPreview = (index: number) => {
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
      setImagenes((prev) => prev.filter((_, i) => i !== index));
    };



  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md space-y-4 animate-fade-in max-h-[80vh] overflow-y-auto"
    >

      <div className="space-y-2">
        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
          Categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="text-gray-500 block w-full rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        >
          <option value="vehiculos">Vehículos</option>
          <option value="motos">Motos</option>
          <option value="inmuebles">Inmuebles</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <div className="text-gray-500 space-y-4">
        <Input label="Título" name="titulo" value={form.titulo ?? ""} onChange={handleChange} />
        <Textarea label="Descripción" name="descripcion" value={form.descripcion ?? ""} onChange={handleChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
          <Input label="Precio" name="precio" type="number" value={form.precio ?? ""} onChange={handleChange} />
          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <input
              list="ubicaciones"
              id="ubicacion"
              name="ubicacion"
              value={form.ubicacion ?? ""}
              onChange={handleChange}
              className="text-gray-500 block w-full rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <datalist id="ubicaciones">
              <option value="Arribeños" />
              <option value="Ascension" />
              <option value="Ferre" />
              <option value="General Arenales" />
              <option value="La Angelita" />
            </datalist>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <h3 className="text-[18px] font-semibold text-gray-700">Datos adicionales</h3>

        {categoria === "vehiculos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="anio" label="Año" type="number" value={form.datos_extra.anio ?? ""} onChange={handleExtraChange} />
            <Input name="km" label="Kilómetros" value={form.datos_extra.km ?? ""} onChange={handleExtraChange} />
          </div>
        )}

        {categoria === "motos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="anio" label="Año" type="number" value={form.datos_extra.anio ?? ""} onChange={handleExtraChange} />
            <Input name="cilindrada" label="Cilindrada (cc)" value={form.datos_extra.cilindrada ?? ""} onChange={handleExtraChange} />
          </div>
        )}

        {categoria === "inmuebles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="metros2" label="Metros cuadrados" value={form.datos_extra.metros2 ?? ""} onChange={handleExtraChange} />
            <Input name="ambientes" label="Ambientes" value={form.datos_extra.ambientes ?? ""} onChange={handleExtraChange} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Imágenes</label>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImagenesChange}
          className="text-gray-500 block w-full"
        />
        {(previewUrls.length > 0 || imagenesServidor.length > 0) && (
          <div className="flex flex-wrap gap-3 mt-2">
            {imagenesServidor.map((url, i) => (
              <div key={`servidor-${i}`} className="w-24 h-24 relative border rounded overflow-hidden shadow">
                <img src={url} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => eliminarImagenServidor(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            ))}

            {previewUrls.map((url, i) => (
              <div key={`preview-${i}`} className="w-24 h-24 relative border rounded overflow-hidden shadow">
                <img src={url} alt={`preview-${i}`} className="object-cover w-full h-full" />
                <button
                  type="button"
                  onClick={() => eliminarImagenPreview(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-between gap-4 sticky bottom-0 bg-white py-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="w-1/2 bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-400 transition-all"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="w-1/2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          {modoEdicion ? "Guardar cambios" : "Publicar"}
        </button>
      </div>
    </form>
  );
}
