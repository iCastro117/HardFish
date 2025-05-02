// Definición de esquemas para MongoDB

// Esquema de Usuario
export interface User {
  _id?: string
  name: string
  email: string
  password: string // Almacenar hash, no contraseña en texto plano
  role: "admin" | "customer"
  phone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

// Esquema de Producto
export interface Product {
  _id?: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  images: string[]
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

// Esquema de Carrito
export interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
}

export interface Cart {
  _id?: string
  userId: string
  items: CartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}

// Esquema de Pedido
export interface Order {
  _id?: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: string
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed"
  createdAt: Date
  updatedAt: Date
}

// Esquema de Mensaje/Consulta
export interface Message {
  _id?: string
  userId: string
  subject: string
  content: string
  status: "unread" | "read" | "replied"
  createdAt: Date
  updatedAt: Date
  replies?: {
    content: string
    createdAt: Date
    adminId: string
  }[]
}

// Esquema para Estadísticas de Búsqueda
export interface SearchStat {
  _id?: string
  term: string
  count: number
  lastSearched: Date
}
