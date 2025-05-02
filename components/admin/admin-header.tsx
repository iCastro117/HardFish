"use client"

import { useState } from "react"
import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/app/context/AuthContext"

export default function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="hidden md:flex md:flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Buscar..." className="w-full pl-8 bg-gray-50" />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.nombre || "Mi Cuenta"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b shadow-lg md:hidden z-50">
          {/* Mobile menu content */}
          <nav className="px-4 py-2 space-y-1">
            <a href="/admin" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50">
              Dashboard
            </a>
            <a href="/admin/clientes" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50">
              Clientes
            </a>
            <a href="/admin/pedidos" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50">
              Pedidos
            </a>
            <a href="/admin/productos" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50">
              Productos
            </a>
            <a href="/admin/estadisticas" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50">
              Estadísticas
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
