"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { adminService } from "@/app/services/api"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { Pedido } from "@/types/admin-types"

export default function PedidosPage() {
  const { toast } = useToast()
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPedido, setCurrentPedido] = useState<Pedido | null>(null)
  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    fetchPedidos()
  }, [])

  const fetchPedidos = async () => {
    try {
      setIsLoading(true)
      const data = await adminService.getPedidos()
      setPedidos(data)
    } catch (error) {
      console.error("Error al obtener pedidos:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los pedidos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilter = () => {
    // Implementar filtrado local por ahora
  }

  const handleViewPedido = (pedido: Pedido) => {
    setCurrentPedido(pedido)
    setNewStatus(pedido.estado)
    setIsDialogOpen(true)
  }

  const handleUpdateStatus = async () => {
    try {
      if (!currentPedido) return

      // En una implementación real, esto sería una llamada a la API para actualizar el estado del pedido
      // await adminService.actualizarEstadoPedido(currentPedido._id, { estado: newStatus })

      // Simulamos la actualización localmente
      const updatedPedidos = pedidos.map((p) => (p._id === currentPedido._id ? { ...p, estado: newStatus } : p))
      setPedidos(updatedPedidos)

      toast({
        title: "Éxito",
        description: "Estado del pedido actualizado correctamente",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al actualizar estado:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pedido",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completado":
        return <Badge className="bg-green-500">Completado</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      case "enviado":
        return <Badge className="bg-blue-500">Enviado</Badge>
      case "cancelado":
        return <Badge className="bg-red-500">Cancelado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredPedidos = pedidos.filter((pedido) => {
    const matchesSearch =
      pedido._id?.toString().includes(searchTerm) ||
      pedido.usuario?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || pedido.estado === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Pedidos</h2>
        <Button>Exportar Pedidos</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtrar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Input
              placeholder="Buscar por ID o cliente..."
              className="max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFilter}>Filtrar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Pedidos</CardTitle>
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
                  <TableHead>ID Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPedidos.length > 0 ? (
                  filteredPedidos.map((pedido) => (
                    <TableRow key={pedido._id}>
                      <TableCell>{pedido._id.toString().substring(0, 8)}...</TableCell>
                      <TableCell>{pedido.usuario?.nombre || "Cliente"}</TableCell>
                      <TableCell>{new Date(pedido.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>${pedido.total.toFixed(2)}</TableCell>
                      <TableCell>{pedido.items?.length || 0}</TableCell>
                      <TableCell>{getStatusBadge(pedido.estado)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewPedido(pedido)}>
                            Ver
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleViewPedido(pedido)}>
                            Actualizar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No se encontraron pedidos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {currentPedido && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles del Pedido</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">ID Pedido</Label>
                  <p>{currentPedido._id}</p>
                </div>
                <div>
                  <Label className="font-bold">Cliente</Label>
                  <p>{currentPedido.usuario?.nombre || "Cliente"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">Fecha</Label>
                  <p>{new Date(currentPedido.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="font-bold">Total</Label>
                  <p>${currentPedido.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">Estado Actual</Label>
                  <p>{getStatusBadge(currentPedido.estado)}</p>
                </div>
                <div>
                  <Label className="font-bold">Actualizar Estado</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="procesando">Procesando</SelectItem>
                      <SelectItem value="enviado">Enviado</SelectItem>
                      <SelectItem value="completado">Completado</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="font-bold">Productos</Label>
                <Table className="mt-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPedido.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{item.cantidad}</TableCell>
                        <TableCell>${item.precio.toFixed(2)}</TableCell>
                        <TableCell>${(item.precio * item.cantidad).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div>
                <Label className="font-bold">Dirección de Envío</Label>
                <p>{currentPedido.direccionEnvio}</p>
              </div>
              <div>
                <Label className="font-bold">Método de Pago</Label>
                <p>{currentPedido.metodoPago}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateStatus}>Actualizar Estado</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
