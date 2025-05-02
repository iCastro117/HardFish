"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/admin/sales-chart"
import { ProductsChart } from "@/components/admin/products-chart"
import { SearchesChart } from "@/components/admin/searches-chart"
import { CustomerChart } from "@/components/admin/customer-chart"
import { adminService } from "@/app/services/api"
import { useToast } from "@/hooks/use-toast"
import type { Estadistica } from "@/types/admin-types"

export default function EstadisticasPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [estadisticas, setEstadisticas] = useState<Estadistica>({
    ventasDiarias: [],
    ventasMensuales: [],
    productosPopulares: [],
    busquedasPopulares: [],
  })

  useEffect(() => {
    fetchEstadisticas()
  }, [])

  const fetchEstadisticas = async () => {
    try {
      setIsLoading(true)
      const data = await adminService.getEstadisticas()
      setEstadisticas(data)
    } catch (error) {
      console.error("Error al obtener estadísticas:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las estadísticas",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Estadísticas</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <Tabs defaultValue="ventas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ventas">Ventas</TabsTrigger>
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="busquedas">Búsquedas</TabsTrigger>
          </TabsList>

          <TabsContent value="ventas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$0</div>
                  <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+0</div>
                  <p className="text-xs text-muted-foreground">+12.2% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+0</div>
                  <p className="text-xs text-muted-foreground">+10.1% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productos en Stock Bajo</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">Requieren atención</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                  <CardDescription>Ventas mensuales durante el último año.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SalesChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Productos Más Vendidos</CardTitle>
                  <CardDescription>Top productos con mayor número de ventas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductsChart data={estadisticas.productosPopulares} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="productos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Productos con Stock Bajo</CardTitle>
                  <CardDescription>Productos que requieren reabastecimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Producto</th>
                          <th className="text-right p-2">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {estadisticas.stock.stockBajo.map((producto) => (
                          <tr key={producto._id} className="border-t">
                            <td className="p-2">{producto.nombre}</td>
                            <td className="text-right p-2">{producto.stock}</td>
                          </tr>
                        ))} */}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Productos Sin Stock</CardTitle>
                  <CardDescription>Productos que necesitan reabastecimiento urgente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Producto</th>
                          <th className="text-right p-2">Precio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {estadisticas.stock.sinStock.map((producto) => (
                          <tr key={producto._id} className="border-t">
                            <td className="p-2">{producto.nombre}</td>
                            <td className="text-right p-2">${producto.precio.toFixed(2)}</td>
                          </tr>
                        ))} */}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clientes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actividad de Clientes</CardTitle>
                <CardDescription>Nuevos clientes vs clientes recurrentes</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <CustomerChart />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mejores Clientes</CardTitle>
                  <CardDescription>Clientes con mayor valor de compras</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Cliente</th>
                          <th className="text-right p-2">Compras</th>
                          <th className="text-right p-2">Valor Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {estadisticas.clientes.mejoresClientes.map((cliente) => (
                          <tr key={cliente._id} className="border-t">
                            <td className="p-2">{cliente.usuario?.nombre}</td>
                            <td className="text-right p-2">{cliente.totalCompras}</td>
                            <td className="text-right p-2">${cliente.valorTotal.toFixed(2)}</td>
                          </tr>
                        ))} */}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nuevos Clientes</CardTitle>
                  <CardDescription>Clientes registrados en el último mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-[300px]">
                    <div className="text-6xl font-bold">0</div>
                    <p className="text-muted-foreground">nuevos clientes este mes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="busquedas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Términos de Búsqueda Populares</CardTitle>
                <CardDescription>Términos más buscados por los usuarios</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <SearchesChart data={estadisticas.busquedasPopulares} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
