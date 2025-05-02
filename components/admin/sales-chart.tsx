"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 5000 },
  { name: "Abr", ventas: 4500 },
  { name: "May", ventas: 6000 },
  { name: "Jun", ventas: 5500 },
  { name: "Jul", ventas: 7000 },
  { name: "Ago", ventas: 6500 },
  { name: "Sep", ventas: 8000 },
  { name: "Oct", ventas: 7500 },
  { name: "Nov", ventas: 9000 },
  { name: "Dic", ventas: 10000 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value: number) => [`$${value}`, "Ventas"]} labelFormatter={(label) => `Mes: ${label}`} />
        <Line type="monotone" dataKey="ventas" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
