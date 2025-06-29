export interface Publicacion {
  id: number;
  categoria: "vehiculos" | "motos" | "inmuebles" | "otros"; // o string si querés algo más abierto
  titulo: string;
  descripcion: string;
  precio: number;
  imagenUrls?: string[];    // ← aquí, un array de rutas o URLs
  ubicacion: string;
  datos_extra: Record<string, unknown>;
}
