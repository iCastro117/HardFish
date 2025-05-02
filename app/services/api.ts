import type { Cliente, Producto, Pedido, Mensaje, Estadistica } from "@/types/admin-types"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Helper function for API requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  // Set headers
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }

  try {
    // Make request
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error en la solicitud")
    }

    return await response.json()
  } catch (error: any) {
    // Handle network errors or other exceptions
    console.error("API Error:", error)
    throw new Error(error.message || "Error en la solicitud")
  }
}

interface LoginCredentials {
  email: string
  password: string
}

// Auth service
export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })
      return response
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  logout: async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  getPerfil: async () => {
    try {
      const response = await fetchWithAuth("/auth/perfil", {
        method: "GET",
      })
      return response
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },
}

// Admin service
export const adminService = {
  // Clientes
  getClientes: async (): Promise<Cliente[]> => {
    try {
      return await fetchWithAuth("/admin/clientes")
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  getClienteById: async (id: string): Promise<Cliente> => {
    try {
      return await fetchWithAuth(`/admin/clientes/${id}`)
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  // Productos
  getProductos: async (): Promise<Producto[]> => {
    try {
      return await fetchWithAuth("/admin/productos")
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  getProductoById: async (id: string): Promise<Producto> => {
    try {
      return await fetchWithAuth(`/admin/productos/${id}`)
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  crearProducto: async (producto: Omit<Producto, "_id">): Promise<Producto> => {
    try {
      return await fetchWithAuth("/admin/productos", {
        method: "POST",
        body: JSON.stringify(producto),
      })
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  actualizarProducto: async (id: string, producto: Partial<Producto>): Promise<Producto> => {
    try {
      return await fetchWithAuth(`/admin/productos/${id}`, {
        method: "PUT",
        body: JSON.stringify(producto),
      })
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  eliminarProducto: async (id: string): Promise<void> => {
    try {
      return await fetchWithAuth(`/admin/productos/${id}`, {
        method: "DELETE",
      })
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  // Pedidos
  getPedidos: async (): Promise<Pedido[]> => {
    try {
      return await fetchWithAuth("/admin/pedidos")
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  getPedidoById: async (id: string): Promise<Pedido> => {
    try {
      return await fetchWithAuth(`/admin/pedidos/${id}`)
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  actualizarEstadoPedido: async (id: string, estado: { estado: string }): Promise<Pedido> => {
    try {
      return await fetchWithAuth(`/admin/pedidos/${id}/estado`, {
        method: "PUT",
        body: JSON.stringify(estado),
      })
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  // Mensajes
  getMensajes: async (): Promise<Mensaje[]> => {
    try {
      return await fetchWithAuth("/admin/mensajes")
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  getMensajeById: async (id: string): Promise<Mensaje> => {
    try {
      return await fetchWithAuth(`/admin/mensajes/${id}`)
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  responderMensaje: async (id: string, respuesta: { contenido: string }): Promise<Mensaje> => {
    try {
      return await fetchWithAuth(`/admin/mensajes/${id}/responder`, {
        method: "POST",
        body: JSON.stringify(respuesta),
      })
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },

  // Estadísticas
  getEstadisticas: async (): Promise<Estadistica> => {
    try {
      return await fetchWithAuth("/admin/estadisticas")
    } catch (error: any) {
      // Re-throw the error to be handled by the calling component
      throw error
    }
  },
}
