const verificarRol = (roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ message: "No autorizado - Usuario no autenticado" })
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ message: "No autorizado - Rol no permitido" })
    }

    next()
  }
}

module.exports = { verificarRol }
