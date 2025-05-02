"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { adminService } from "@/app/services/api"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Mensaje } from "@/types/admin-types"

export default function MensajesPage() {
  const { toast } = useToast()
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMensaje, setCurrentMensaje] = useState<Mensaje | null>(null)
  const [respuesta, setRespuesta] = useState("")

  useEffect(() => {
    fetchMensajes()
  }, [])

  const fetchMensajes = async () => {
    try {
      setIsLoading(true)
      const data = await adminService.getMensajes()
      setMensajes(data)
    } catch (error) {
      console.error("Error al obtener mensajes:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los mensajes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    // Implementar búsqueda local por ahora
  }

  const handleViewMensaje = (mensaje: Mensaje) => {
    setCurrentMensaje(mensaje)
    setRespuesta("")
    setIsDialogOpen(true)
  }

  const handleResponder = async () => {
    if (!respuesta.trim()) {
      toast({
        title: "Error",
        description: "La respuesta no puede estar vacía",
        variant: "destructive",
      })
      return
    }

    try {
      if (!currentMensaje) return

      // En una implementación real, esto sería una llamada a la API para responder al mensaje
      // await adminService.responderMensaje(currentMensaje._id, { contenido: respuesta })

      // Simulamos la actualización localmente
      const updatedMensajes = mensajes.map((m) =>
        m._id === currentMensaje._id
          ? {
              ...m,
              estado: "respondido",
              respuestas: [...(m.respuestas || []), { contenido: respuesta, fechaCreacion: new Date() }],
            }
          : m,
      )
      setMensajes(updatedMensajes)

      toast({
        title: "Éxito",
        description: "Mensaje respondido correctamente",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al responder mensaje:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar la respuesta",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "no leído":
        return <Badge className="bg-red-500">No leído</Badge>
      case "leído":
        return <Badge className="bg-yellow-500">Leído</Badge>
      case "respondido":
        return <Badge className="bg-green-500">Respondido</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredMensajes = mensajes.filter(
    (mensaje) =>
      mensaje.asunto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mensaje.usuario?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Mensajes y Consultas</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtrar Mensajes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Input
              placeholder="Buscar por asunto o cliente..."
              className="max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bandeja de Entrada</CardTitle>
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
                  <TableHead>Cliente</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMensajes.length > 0 ? (
                  filteredMensajes.map((mensaje) => (
                    <TableRow key={mensaje._id}>
                      <TableCell>{mensaje._id.toString().substring(0, 8)}...</TableCell>
                      <TableCell>{mensaje.usuario?.nombre || "Cliente"}</TableCell>
                      <TableCell>{mensaje.asunto}</TableCell>
                      <TableCell>{mensaje.categoria}</TableCell>
                      <TableCell>{new Date(mensaje.fechaCreacion).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(mensaje.estado)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewMensaje(mensaje)}>
                            Ver
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewMensaje(mensaje)}
                            disabled={mensaje.estado === "respondido"}
                          >
                            Responder
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No se encontraron mensajes
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {currentMensaje && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles del Mensaje</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-bold">Cliente</Label>
                  <p>{currentMensaje.usuario?.nombre || "Cliente"}</p>
                </div>
                <div>
                  <Label className="font-bold">Fecha</Label>
                  <p>{new Date(currentMensaje.fechaCreacion).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <Label className="font-bold">Asunto</Label>
                <p>{currentMensaje.asunto}</p>
              </div>
              <div>
                <Label className="font-bold">Categoría</Label>
                <p>{currentMensaje.categoria}</p>
              </div>
              <div>
                <Label className="font-bold">Mensaje</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p>{currentMensaje.contenido}</p>
                </div>
              </div>

              {currentMensaje.respuestas && currentMensaje.respuestas.length > 0 && (
                <div>
                  <Label className="font-bold">Respuestas</Label>
                  {currentMensaje.respuestas.map((resp, index) => (
                    <div key={index} className="mt-1 p-3 bg-blue-50 rounded-md">
                      <p>{resp.contenido}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(resp.fechaCreacion).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}

              {currentMensaje.estado !== "respondido" && (
                <div>
                  <Label htmlFor="respuesta" className="font-bold">
                    Responder
                  </Label>
                  <Textarea
                    id="respuesta"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cerrar
              </Button>
              {currentMensaje.estado !== "respondido" && <Button onClick={handleResponder}>Enviar Respuesta</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
