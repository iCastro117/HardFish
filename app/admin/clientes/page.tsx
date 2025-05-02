"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { adminService } from "@/app/services/api"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { Cliente } from "@/types/admin-types"

interface HistorialPedido {
  id: string
  fecha: string
  total: number
  estado: string
  productos: number
}

export default function ClientesPage() {
  const { toast } = useToast()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCliente, setCurrentCliente] = useState<Cliente | null>(null)
  const [clienteHistorial, setClienteHistorial] = useState<HistorialPedido[]>([])
  const [isHistorialLoading, setIsHistorialLoading] = useState(false)

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    try {
      setIsLoading(true)
      const data = await adminService.getClientes()
      setClientes(data)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los clientes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    // Implementar búsqueda local por ahora
  }

  const handleViewCliente = (cliente: Cliente) => {
    setCurrentCliente(cliente)
    setIsDialogOpen(true)
  }

  const handleViewHistorial = async (clienteId: string) => {
    try {
      setIsHistorialLoading(true)
      // En una implementación real, esto sería una llamada a la API para obtener el historial de pedidos del cliente
      // Por ahora, simulamos datos
      const historialSimulado: HistorialPedido[] = [
        {
          id: "ORD-001",
          fecha: "2023-05-15",
          total: 1250.99,
          estado: "completado",
          productos: 3,
        },
        {
          id: "ORD-002",
          fecha: "2023-04-20",
          total: 890.5,
          estado: "completado",
          productos: 2,
        },
      ]

      setTimeout(() => {
        setClienteHistorial(historialSimulado)
        setIsHistorialLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error al obtener historial:", error)
      toast({
        title: "Error",
        description: "No se pudo cargar el historial del cliente",
        variant: "destructive",
      })
      setIsHistorialLoading(false)
    }
  }

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono?.includes(searchTerm),
  )

  return (
    <div className="space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Clientes</h2>
        <Button>Exportar Datos</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.length > 0 ? (
                  filteredClientes.map((cliente) => (
                    <TableRow key={cliente._id}>
                      <TableCell>{cliente._id.toString().substring(0, 8)}...</TableCell>
                      <TableCell>{cliente.nombre}</TableCell>
                      <TableCell>{cliente.email}</TableCell>
                      <TableCell>{cliente.telefono || "N/A"}</TableCell>
                      <TableCell>{cliente.direccion || "N/A"}</TableCell>
                      <TableCell>{new Date(cliente.fechaRegistro).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewCliente(cliente)}>
                            Ver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              handleViewHistorial(cliente._id)
                              handleViewCliente(cliente)
                            }}
                          >
                            Historial
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No se encontraron clientes
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {currentCliente && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles del Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">Nombre</Label>
                  <p>{currentCliente.nombre}</p>
                </div>
                <div>
                  <Label className="font-bold">Email</Label>
                  <p>{currentCliente.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">Teléfono</Label>
                  <p>{currentCliente.telefono || "N/A"}</p>
                </div>
                <div>
                  <Label className="font-bold">Dirección</Label>
                  <p>{currentCliente.direccion || "N/A"}</p>
                </div>
              </div>
              <div>
                <Label className="font-bold">Fecha de Registro</Label>
                <p>{new Date(currentCliente.fechaRegistro).toLocaleDateString()}</p>
              </div>

              {clienteHistorial.length > 0 && (
                <div className="mt-4">
                  <Label className="font-bold text-lg">Historial de Pedidos</Label>
                  {isHistorialLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <Table className="mt-2">
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Pedido</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clienteHistorial.map((pedido) => (
                          <TableRow key={pedido.id}>
                            <TableCell>{pedido.id}</TableCell>
                            <TableCell>{pedido.fecha}</TableCell>
                            <TableCell>${pedido.total.toFixed(2)}</TableCell>
                            <TableCell>{pedido.estado}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
