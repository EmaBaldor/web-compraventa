export interface Publicacion {
  id: number;
  categoria: "vehiculo" | "moto" | "inmueble" | "otros"; // o string si querés algo más abierto
  titulo: string;
  descripcion: string;
  precio: number;
  imagenUrls?: string[];    // ← aquí, un array de rutas o URLs
  datos_extra: Record<string, unknown>;
}
