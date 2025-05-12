const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const { verificarJWT, verificarRol } = require("../middlewares/verificarJWT")

// Rutas protegidas con JWT y rol de administrador
router.get("/clientes", verificarJWT, verificarRol(["admin"]), adminController.obtenerClientes)
router.get("/pedidos", verificarJWT, verificarRol(["admin"]), adminController.obtenerPedidos)
router.get("/productos", verificarJWT, verificarRol(["admin"]), adminController.obtenerProductos)
router.post("/productos", verificarJWT, verificarRol(["admin"]), adminController.crearProducto)
router.put("/productos/:id", verificarJWT, verificarRol(["admin"]), adminController.actualizarProducto)
router.delete("/productos/:id", verificarJWT, verificarRol(["admin"]), adminController.eliminarProducto)
router.get("/estadisticas", verificarJWT, verificarRol(["admin"]), adminController.obtenerEstadisticas)
router.get("/mensajes", verificarJWT, verificarRol(["admin"]), adminController.obtenerMensajes)

module.exports = router
