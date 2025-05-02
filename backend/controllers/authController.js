const Usuario = require("../models/Usuario")
const jwt = require("jsonwebtoken")

// Generar token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// Registrar un nuevo usuario
exports.registro = async (req, res) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email })
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: "El email ya está registrado",
      })
    }

    // Crear nuevo usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      telefono,
      direccion,
    })

    // Generar token
    const token = generarToken(usuario._id)

    res.status(201).json({
      success: true,
      token,
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Verificar si se proporcionaron email y password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Por favor proporcione email y contraseña",
      })
    }

    // Buscar usuario y seleccionar la contraseña
    const usuario = await Usuario.findOne({ email }).select("+password")

    // Verificar si el usuario existe y la contraseña es correcta
    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Email o contraseña incorrectos",
      })
    }

    // Generar token
    const token = generarToken(usuario._id)

    res.status(200).json({
      success: true,
      token,
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener usuario actual
exports.getUsuarioActual = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id)

    res.status(200).json({
      success: true,
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          telefono: usuario.telefono,
          direccion: usuario.direccion,
          rol: usuario.rol,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
