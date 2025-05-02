"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Home, Package, ShoppingCart, Users, MessageSquare, Settings, LogOut } from "lucide-react"

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Clientes", href: "/admin/clientes", icon: Users },
  { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { name: "Productos", href: "/admin/productos", icon: Package },
  { name: "Estadísticas", href: "/admin/estadisticas", icon: BarChart3 },
  { name: "Mensajes", href: "/admin/mensajes", icon: MessageSquare },
  { name: "Configuración", href: "/admin/configuracion", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-white border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Panel Admin</h2>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-gray-900" : "text-gray-400")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Salir
        </Link>
      </div>
    </div>
  )
}
