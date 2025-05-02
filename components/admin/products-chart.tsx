"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { ProductoVendido } from "@/types/admin-types"

interface ProductsChartProps {
  data?: ProductoVendido[]
}

export function ProductsChart({ data = [] }: ProductsChartProps) {
  // Si no hay datos, usar datos de ejemplo
  const chartData =
    data.length > 0
      ? data.map((item) => ({
          name: item.nombre
            ? item.nombre.length > 10
              ? item.nombre.substring(0, 10) + "..."
              : item.nombre
            : "Producto",
          ventas: item.cantidad || 0,
        }))
      : [
          { name: "Smartphone XYZ", ventas: 120 },
          { name: "Laptop Ultra", ventas: 85 },
          { name: "Auriculares BT", ventas: 210 },
          { name: 'Monitor 27"', ventas: 65 },
          { name: "Teclado Mec.", ventas: 95 },
          { name: "Mouse Gaming", ventas: 150 },
          { name: "Tablet Pro", ventas: 70 },
          { name: "Cámara 4K", ventas: 45 },
          { name: "Altavoces BT", ventas: 110 },
          { name: "SSD 1TB", ventas: 130 },
        ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
        <Tooltip
          formatter={(value: number) => [`${value} unidades`, "Ventas"]}
          labelFormatter={(label) => `Producto: ${label}`}
        />
        <Bar dataKey="ventas" fill="#4f46e5" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
