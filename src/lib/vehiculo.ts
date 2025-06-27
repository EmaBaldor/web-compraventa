export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  km: string;
  descripcion: string;
  imagenUrl: string;
  imagenUrls?: string[];    // ← aquí, un array de rutas o URLs
}
