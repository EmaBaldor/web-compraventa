import "@/styles/globals.css";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "CompraVenta Vehículos",
  description: "Listado y publicación de vehículos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <nav className="flex gap-8 text-sm font-medium max-w-6xl mx-auto">
              <Link href="/" className="hover:text-blue-400 transition-colors">Inicio</Link>
              <Link href="/publicar" className="hover:text-blue-400 transition-colors">Publicar</Link>
              <Link href="/contacto" className="hover:text-blue-400 transition-colors">Contacto</Link>
            </nav>
            <img src="/profile.png" alt="profile" className="h-10 w-auto" />
          </div>
        </header>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
