"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/api"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay un token almacenado
    const token = localStorage.getItem("token")
    if (token) {
      loadUserData()
    } else {
      setIsLoading(false)
    }
  }, [])

  const loadUserData = async () => {
    try {
      const response = await authService.getPerfil()
      setUser(response.data.usuario)
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error)
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const response = await authService.login(credentials)
      localStorage.setItem("token", response.token)
      setUser(response.data.usuario)

      // Redirigir según el rol
      if (response.data.usuario.rol === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.rol === "admin",
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
