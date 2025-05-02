const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Por favor ingrese su nombre"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Por favor ingrese su email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Por favor ingrese un email válido"],
    },
    password: {
      type: String,
      required: [true, "Por favor ingrese una contraseña"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false,
    },
    telefono: {
      type: String,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
    rol: {
      type: String,
      enum: ["cliente", "admin"],
      default: "cliente",
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Encriptar contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function (passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password)
}

module.exports = mongoose.model("Usuario", usuarioSchema)
