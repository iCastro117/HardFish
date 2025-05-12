const mongoose = require("mongoose")

// Esquema para estadísticas de búsqueda
const busquedaSchema = new mongoose.Schema({
  termino: {
    type: String,
    required: true,
    trim: true,
  },
  contador: {
    type: Number,
    default: 1,
  },
  ultimaBusqueda: {
    type: Date,
    default: Date.now,
  },
})

// Esquema para estadísticas de ventas diarias
const ventaDiariaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  totalVentas: {
    type: Number,
    default: 0,
  },
  cantidadPedidos: {
    type: Number,
    default: 0,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
      },
      nombre: String,
      cantidad: Number,
      total: Number,
    },
  ],
})

// Esquema para estadísticas de clientes
const clienteEstadisticaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  totalCompras: {
    type: Number,
    default: 0,
  },
  ultimaCompra: {
    type: Date,
  },
  productosComprados: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
      },
      nombre: String,
      cantidad: Number,
    },
  ],
  valorTotal: {
    type: Number,
    default: 0,
  },
})

// Exportar modelos
const Busqueda = mongoose.model("Busqueda", busquedaSchema)
const VentaDiaria = mongoose.model("VentaDiaria", ventaDiariaSchema)
const ClienteEstadistica = mongoose.model("ClienteEstadistica", clienteEstadisticaSchema)

module.exports = {
  Busqueda,
  VentaDiaria,
  ClienteEstadistica,
}
