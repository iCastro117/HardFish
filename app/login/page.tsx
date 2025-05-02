"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../context/AuthContext"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { login } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    })
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.id]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(loginData)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
      })
    } catch (error: any) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message || "Credenciales incorrectas. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Aquí iría la lógica de registro con JWT y MongoDB

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente.",
      })
    }, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>Ingresa tus credenciales para acceder a tu cuenta.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Contraseña</Label>
                      <Link href="/recuperar-contrasena" className="text-sm text-blue-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear Cuenta</CardTitle>
                <CardDescription>Ingresa tus datos para crear una nueva cuenta.</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo</Label>
                    <Input
                      id="nombre"
                      placeholder="Juan Pérez"
                      required
                      value={registerData.nombre}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
