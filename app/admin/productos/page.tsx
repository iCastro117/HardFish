"use client"

import type React from "react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Producto } from "@/types/admin-types"

export default function ProductosPage() {
  const { toast } = useToast()
  const [productos, setProductos] = useState<Producto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProducto, setCurrentProducto] = useState<Producto>({
    _id: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    categoria: "Procesadores",
    imagenes: [],
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    try {
      setIsLoading(true)
      const data = await adminService.getProductos()
      setProductos(data)
    } catch (error) {
      console.error("Error al obtener productos:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    // Implementar búsqueda local por ahora
    // En una implementación real, esto podría ser una llamada a la API con filtros
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProducto({
      ...currentProducto,
      [name]: name === "precio" || name === "stock" ? Number.parseFloat(value) : value,
    })
  }

  const handleSelectChange = (value: string) => {
    setCurrentProducto({
      ...currentProducto,
      categoria: value,
    })
  }

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await adminService.actualizarProducto(currentProducto._id, currentProducto)
        toast({
          title: "Éxito",
          description: "Producto actualizado correctamente",
        })
      } else {
        await adminService.crearProducto(currentProducto)
        toast({
          title: "Éxito",
          description: "Producto creado correctamente",
        })
      }
      setIsDialogOpen(false)
      fetchProductos()
    } catch (error) {
      console.error("Error al guardar producto:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el producto",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (producto: Producto) => {
    setCurrentProducto(producto)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await adminService.eliminarProducto(id)
        toast({
          title: "Éxito",
          description: "Producto eliminado correctamente",
        })
        fetchProductos()
      } catch (error) {
        console.error("Error al eliminar producto:", error)
        toast({
          title: "Error",
          description: "No se pudo eliminar el producto",
          variant: "destructive",
        })
      }
    }
  }

  const handleNewProduct = () => {
    setCurrentProducto({
      _id: "",
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
      categoria: "Procesadores",
      imagenes: [],
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const getStockBadge = (stock: number) => {
    if (stock <= 0) {
      return <Badge className="bg-red-500">Sin Stock</Badge>
    } else if (stock < 10) {
      return <Badge className="bg-yellow-500">Stock Bajo</Badge>
    } else {
      return <Badge className="bg-green-500">Activo</Badge>
    }
  }

  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || producto._id.toString().includes(searchTerm),
  )

  return (
    <div className="space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Productos</h2>
        <div className="flex gap-2">
          <Button onClick={handleNewProduct}>Nuevo Producto</Button>
          <Button variant="outline">Exportar</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Input
              placeholder="Buscar por nombre o ID..."
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
          <CardTitle>Inventario de Productos</CardTitle>
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
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProductos.length > 0 ? (
                  filteredProductos.map((producto) => (
                    <TableRow key={producto._id}>
                      <TableCell>{producto._id.toString().substring(0, 8)}...</TableCell>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.categoria}</TableCell>
                      <TableCell>${producto.precio.toFixed(2)}</TableCell>
                      <TableCell>{producto.stock}</TableCell>
                      <TableCell>{getStockBadge(producto.stock)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(producto)}>
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(producto._id)}>
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No se encontraron productos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={currentProducto.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre del producto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={currentProducto.categoria} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Procesadores">Procesadores</SelectItem>
                    <SelectItem value="Tarjetas Gráficas">Tarjetas Gráficas</SelectItem>
                    <SelectItem value="Placas Base">Placas Base</SelectItem>
                    <SelectItem value="Memoria RAM">Memoria RAM</SelectItem>
                    <SelectItem value="Almacenamiento">Almacenamiento</SelectItem>
                    <SelectItem value="Periféricos">Periféricos</SelectItem>
                    <SelectItem value="Otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={currentProducto.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del producto"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  name="precio"
                  type="number"
                  value={currentProducto.precio}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={currentProducto.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
            {/* Aquí se podría añadir un componente para subir imágenes */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>{isEditing ? "Actualizar" : "Crear"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
