const mongoose = require("mongoose")

const itemPedidoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: [1, "La cantidad mínima es 1"],
  },
  precio: {
    type: Number,
    required: true,
  },
  nombre: String,
  imagen: String,
})

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    items: [itemPedidoSchema],
    total: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "procesando", "enviado", "entregado", "cancelado"],
      default: "pendiente",
    },
    direccionEnvio: {
      type: String,
      required: true,
    },
    metodoPago: {
      type: String,
      required: true,
      enum: ["tarjeta", "transferencia", "contraentrega"],
    },
    estadoPago: {
      type: String,
      enum: ["pendiente", "pagado", "fallido"],
      default: "pendiente",
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Pedido", pedidoSchema)
