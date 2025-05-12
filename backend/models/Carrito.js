const mongoose = require("mongoose")

const itemCarritoSchema = new mongoose.Schema({
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

const carritoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    items: [itemCarritoSchema],
    total: {
      type: Number,
      default: 0,
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

// Método para calcular el total del carrito
carritoSchema.methods.calcularTotal = function () {
  this.total = this.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  return this.total
}

module.exports = mongoose.model("Carrito", carritoSchema)
