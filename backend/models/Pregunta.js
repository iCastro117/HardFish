const mongoose = require("mongoose")

const respuestaSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
})

const preguntaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    asunto: {
      type: String,
      required: true,
      trim: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      enum: ["no leído", "leído", "respondido"],
      default: "no leído",
    },
    categoria: {
      type: String,
      enum: ["compras", "técnico", "devoluciones", "otros"],
      required: true,
    },
    respuestas: [respuestaSchema],
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Pregunta", preguntaSchema)
