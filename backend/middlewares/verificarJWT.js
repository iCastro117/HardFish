const jwt = require("jsonwebtoken")
const Usuario = require("../models/Usuario")

const verificarJWT = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "No autorizado - Token no proporcionado" })
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Buscar el usuario
    const usuario = await Usuario.findById(decoded.id).select("-password")

    if (!usuario) {
      return res.status(401).json({ message: "No autorizado - Usuario no encontrado" })
    }

    // Añadir el usuario al request
    req.usuario = usuario
    next()
  } catch (error) {
    return res.status(401).json({ message: "No autorizado - Token inválido" })
  }
}

module.exports = { verificarJWT, verificarRol: require("./verificarRol").verificarRol }
