const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { verificarJWT } = require("../middlewares/verificarJWT")

// Rutas públicas
router.post("/registro", authController.registro)
router.post("/login", authController.login)

// Rutas protegidas
router.get("/perfil", verificarJWT, authController.getUsuarioActual)

module.exports = router
