const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/clienteController")
const { verificarJWT, verificarRol } = require("../middlewares/verificarJWT")

// Rutas públicas
router.get("/productos", clienteController.getProductos)
router.get("/productos/:id", clienteController.getProducto)

// Rutas protegidas
router.get("/carrito", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.getCarrito)
router.post("/carrito", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.agregarAlCarrito)
router.put("/carrito", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.actualizarCarrito)
router.delete(
  "/carrito/:productoId",
  verificarJWT,
  verificarRol(["cliente", "admin"]),
  clienteController.eliminarDelCarrito,
)

router.post("/pedidos", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.crearPedido)
router.get("/pedidos", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.getPedidos)
router.get("/pedidos/:id", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.getPedido)

router.post("/preguntas", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.enviarPregunta)
router.get("/preguntas", verificarJWT, verificarRol(["cliente", "admin"]), clienteController.getPreguntas)

module.exports = router
