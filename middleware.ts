import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/login", "/registro", "/productos"]

  // Verificar si la ruta actual es pública
  const { pathname } = new URL(request.url)
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith("/api/auth"))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Para rutas protegidas, verificar la sesión
  return updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
