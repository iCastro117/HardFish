"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Nuevos", value: 400 },
  { name: "Recurrentes", value: 300 },
  { name: "Inactivos", value: 200 },
]

const COLORS = ["#4f46e5", "#10b981", "#f59e0b"]

export function CustomerChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value} clientes`, "Cantidad"]}
          labelFormatter={(label) => `Tipo: ${label}`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
