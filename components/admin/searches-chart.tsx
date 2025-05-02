"use client"

import { ResponsiveContainer, Treemap, Tooltip } from "recharts"
import type { TerminoBusqueda } from "@/types/admin-types"

interface SearchesChartProps {
  data?: TerminoBusqueda[]
}

export function SearchesChart({ data = [] }: SearchesChartProps) {
  // Si no hay datos, usar datos de ejemplo
  const chartData =
    data.length > 0
      ? data.map((item) => ({
          name: item.termino || "término",
          size: item.contador || 0,
        }))
      : [
          { name: "smartphone", size: 1200 },
          { name: "laptop", size: 850 },
          { name: "auriculares", size: 750 },
          { name: "monitor", size: 650 },
          { name: "teclado", size: 550 },
          { name: "mouse", size: 500 },
          { name: "tablet", size: 450 },
          { name: "cámara", size: 400 },
          { name: "altavoces", size: 350 },
          { name: "ssd", size: 300 },
          { name: "impresora", size: 250 },
          { name: "router", size: 200 },
        ]

  // Custom content component for the Treemap
  const CustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = props

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : "none",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 && (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={12}>
            {name}
          </text>
        )}
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap data={chartData} dataKey="size" stroke="#fff" fill="#4f46e5" content={<CustomizedContent />}>
        <Tooltip
          formatter={(value: number) => [`${value} búsquedas`, "Frecuencia"]}
          labelFormatter={(label) => `Término: ${label}`}
        />
      </Treemap>
    </ResponsiveContainer>
  )
}
