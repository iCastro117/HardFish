"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mi Tienda</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/admin">
              <Button>Panel de Administrador</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Bienvenido a Mi Tienda</h2>
          <p className="text-lg mb-8">
            Aquí puedes integrar tu interfaz de cliente existente. Esta es solo una página de ejemplo.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/productos">
              <Button size="lg">Ver Productos</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
