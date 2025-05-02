// User/Client types
export interface Cliente {
  _id: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro: Date | string;
}

// Product types
export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenes: string[];
}

// Order types
export interface ItemPedido {
  nombre: string;
  cantidad: number;
  precio: number;
  producto?: string; // ID del producto
}

export interface Pedido {
  _id: string;
  usuario: {
    _id: string;
    nombre: string;
    email?: string;
  };
  items: ItemPedido[];
  total: number;
  estado: string;
  createdAt: Date | string;
  direccionEnvio: string;
  metodoPago: string;
}

// Message types
export interface Respuesta {
  contenido: string;
  fechaCreacion: Date | string;
}

export interface Mensaje {
  _id: string;
  usuario: {
    _id: string;
    nombre: string;
    email?: string;
  };
  asunto: string;
  contenido: string;
  categoria: string;
  estado: string;
  fechaCreacion: Date | string;
  respuestas?: Respuesta[];
}

// Statistics types
export interface ProductoVendido {
  _id?: string;
  nombre: string;
  cantidad: number;
}

export interface TerminoBusqueda {
  _id?: string;
  termino: string;
  contador: number;
}

export interface Estadistica {
  ventasDiarias: number[];
  ventasMensuales: number[];
  productosPopulares: ProductoVendido[];
  busquedasPopulares: TerminoBusqueda[];
}
