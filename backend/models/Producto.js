const mongoose = require("mongoose")

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Por favor ingrese el nombre del producto"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "Por favor ingrese la descripción del producto"],
    },
    precio: {
      type: Number,
      required: [true, "Por favor ingrese el precio del producto"],
      min: [0, "El precio no puede ser negativo"],
    },
    imagenes: [String],
    categoria: {
      type: String,
      required: [true, "Por favor seleccione una categoría"],
      enum: [
        "Procesadores",
        "Tarjetas Gráficas",
        "Placas Base",
        "Memoria RAM",
        "Almacenamiento",
        "Periféricos",
        "Otros",
      ],
    },
    stock: {
      type: Number,
      required: [true, "Por favor ingrese la cantidad en stock"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    etiquetas: [String],
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Índice para búsquedas
productoSchema.index({ nombre: "text", descripcion: "text", categoria: "text" })

module.exports = mongoose.model("Producto", productoSchema)
