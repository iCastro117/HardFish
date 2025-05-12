const Usuario = require("../models/Usuario")
const Producto = require("../models/Producto")
const Pedido = require("../models/Pedido")
const Pregunta = require("../models/Pregunta")
const { Busqueda, VentaDiaria, ClienteEstadistica } = require("../models/Estadistica")

// Obtener todos los usuarios (solo para admin)
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password")

    res.status(200).json({
      success: true,
      count: usuarios.length,
      data: usuarios,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener un usuario específico (solo para admin)
exports.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-password")

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    res.status(200).json({
      success: true,
      data: usuario,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Crear un nuevo producto (solo para admin)
// exports.crearProducto = async (req, res) => {
//   try {
//     const producto = await Producto.create(req.body)

//     res.status(201).json({
//       success: true,
//       data: producto,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // Actualizar un producto (solo para admin)
// exports.actualizarProducto = async (req, res) => {
//   try {
//     const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//     if (!producto) {
//       return res.status(404).json({
//         success: false,
//         message: "Producto no encontrado",
//       })
//     }

//     res.status(200).json({
//       success: true,
//       data: producto,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // Eliminar un producto (solo para admin)
// exports.eliminarProducto = async (req, res) => {
//   try {
//     const producto = await Producto.findByIdAndDelete(req.params.id)

//     if (!producto) {
//       return res.status(404).json({
//         success: false,
//         message: "Producto no encontrado",
//       })
//     }

//     res.status(200).json({
//       success: true,
//       data: {},
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// Obtener todos los pedidos (solo para admin)
exports.getPedidos = async (req, res) => {
  try {
    const { estado, fechaInicio, fechaFin } = req.query

    // Construir filtro
    const filtro = {}

    if (estado) {
      filtro.estado = estado
    }

    if (fechaInicio || fechaFin) {
      filtro.createdAt = {}
      if (fechaInicio) {
        filtro.createdAt.$gte = new Date(fechaInicio)
      }
      if (fechaFin) {
        filtro.createdAt.$lte = new Date(fechaFin)
      }
    }

    const pedidos = await Pedido.find(filtro)
      .populate("usuario", "nombre email telefono direccion")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: pedidos.length,
      data: pedidos,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Actualizar estado de un pedido (solo para admin)
exports.actualizarEstadoPedido = async (req, res) => {
  try {
    const { estado } = req.body

    if (!estado) {
      return res.status(400).json({
        success: false,
        message: "Por favor proporcione el estado del pedido",
      })
    }

    const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado }, { new: true, runValidators: true })

    if (!pedido) {
      return res.status(404).json({
        success: false,
        message: "Pedido no encontrado",
      })
    }

    res.status(200).json({
      success: true,
      data: pedido,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener todas las preguntas (solo para admin)
exports.getPreguntas = async (req, res) => {
  try {
    const { estado } = req.query

    // Construir filtro
    const filtro = {}

    if (estado) {
      filtro.estado = estado
    }

    const preguntas = await Pregunta.find(filtro).populate("usuario", "nombre email").sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: preguntas.length,
      data: preguntas,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Responder a una pregunta (solo para admin)
exports.responderPregunta = async (req, res) => {
  try {
    const { contenido } = req.body

    if (!contenido) {
      return res.status(400).json({
        success: false,
        message: "Por favor proporcione el contenido de la respuesta",
      })
    }

    const pregunta = await Pregunta.findById(req.params.id)

    if (!pregunta) {
      return res.status(404).json({
        success: false,
        message: "Pregunta no encontrada",
      })
    }

    // Añadir respuesta
    pregunta.respuestas.push({
      contenido,
      admin: req.usuario.id,
    })

    // Actualizar estado
    pregunta.estado = "respondido"

    await pregunta.save()

    res.status(200).json({
      success: true,
      data: pregunta,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener estadísticas de ventas (solo para admin)
exports.getEstadisticasVentas = async (req, res) => {
  try {
    const { periodo } = req.query
    let fechaInicio, fechaFin

    // Determinar período
    const hoy = new Date()

    switch (periodo) {
      case "dia":
        fechaInicio = new Date(hoy.setHours(0, 0, 0, 0))
        fechaFin = new Date(hoy.setHours(23, 59, 59, 999))
        break
      case "semana":
        fechaInicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()))
        fechaInicio.setHours(0, 0, 0, 0)
        fechaFin = new Date(hoy.setDate(hoy.getDate() + 6))
        fechaFin.setHours(23, 59, 59, 999)
        break
      case "mes":
        fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
        fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0, 23, 59, 59, 999)
        break
      case "año":
        fechaInicio = new Date(hoy.getFullYear(), 0, 1)
        fechaFin = new Date(hoy.getFullYear(), 11, 31, 23, 59, 59, 999)
        break
      default:
        // Por defecto, último mes
        fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate())
        fechaFin = new Date(hoy)
    }

    // Obtener pedidos en el período
    const pedidos = await Pedido.find({
      createdAt: { $gte: fechaInicio, $lte: fechaFin },
      estado: { $ne: "cancelado" },
    })

    // Calcular estadísticas
    const totalVentas = pedidos.reduce((acc, pedido) => acc + pedido.total, 0)
    const cantidadPedidos = pedidos.length

    // Productos más vendidos
    const productosVendidos = {}
    pedidos.forEach((pedido) => {
      pedido.items.forEach((item) => {
        if (productosVendidos[item.producto]) {
          productosVendidos[item.producto].cantidad += item.cantidad
          productosVendidos[item.producto].total += item.precio * item.cantidad
        } else {
          productosVendidos[item.producto] = {
            producto: item.producto,
            nombre: item.nombre,
            cantidad: item.cantidad,
            total: item.precio * item.cantidad,
          }
        }
      })
    })

    // Convertir a array y ordenar
    const productosMasVendidos = Object.values(productosVendidos)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        periodo,
        fechaInicio,
        fechaFin,
        totalVentas,
        cantidadPedidos,
        productosMasVendidos,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener estadísticas de clientes (solo para admin)
exports.getEstadisticasClientes = async (req, res) => {
  try {
    // Obtener estadísticas de clientes
    const estadisticasClientes = await ClienteEstadistica.find()
      .populate("usuario", "nombre email")
      .sort({ totalCompras: -1 })
      .limit(10)

    // Total de clientes
    const totalClientes = await Usuario.countDocuments({ rol: "cliente" })

    // Clientes nuevos (último mes)
    const fechaInicio = new Date()
    fechaInicio.setMonth(fechaInicio.getMonth() - 1)

    const clientesNuevos = await Usuario.countDocuments({
      rol: "cliente",
      createdAt: { $gte: fechaInicio },
    })

    res.status(200).json({
      success: true,
      data: {
        totalClientes,
        clientesNuevos,
        mejoresClientes: estadisticasClientes,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener estadísticas de búsquedas (solo para admin)
exports.getEstadisticasBusquedas = async (req, res) => {
  try {
    // Obtener términos más buscados
    const busquedasPopulares = await Busqueda.find().sort({ contador: -1 }).limit(20)

    res.status(200).json({
      success: true,
      data: busquedasPopulares,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener estadísticas de stock (solo para admin)
exports.getEstadisticasStock = async (req, res) => {
  try {
    // Productos con stock bajo (menos de 10 unidades)
    const stockBajo = await Producto.find({ stock: { $lt: 10, $gt: 0 } }).sort({ stock: 1 })

    // Productos sin stock
    const sinStock = await Producto.find({ stock: 0 })

    // Productos con exceso de stock (más de 100 unidades)
    const stockExceso = await Producto.find({ stock: { $gt: 100 } }).sort({ stock: -1 })

    res.status(200).json({
      success: true,
      data: {
        stockBajo,
        sinStock,
        stockExceso,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const adminController = {
  obtenerClientes: async (req, res) => {
    try {
      const clientes = await Usuario.find({ rol: "cliente" })
      res.json(clientes)
    } catch (error) {
      res.status(500).json({ message: "Error al obtener clientes", error })
    }
  },
  obtenerPedidos: async (req, res) => {
    try {
      const pedidos = await Pedido.find().populate("usuario").populate("productos")
      res.json(pedidos)
    } catch (error) {
      res.status(500).json({ message: "Error al obtener pedidos", error })
    }
  },
  obtenerProductos: async (req, res) => {
    try {
      const productos = await Producto.find()
      res.json(productos)
    } catch (error) {
      res.status(500).json({ message: "Error al obtener productos", error })
    }
  },
  crearProducto: async (req, res) => {
    try {
      const nuevoProducto = new Producto(req.body)
      const productoGuardado = await nuevoProducto.save()
      res.status(201).json(productoGuardado)
    } catch (error) {
      res.status(500).json({ message: "Error al crear producto", error })
    }
  },
  actualizarProducto: async (req, res) => {
    try {
      const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.json(productoActualizado)
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar producto", error })
    }
  },
  eliminarProducto: async (req, res) => {
    try {
      await Producto.findByIdAndDelete(req.params.id)
      res.json({ message: "Producto eliminado" })
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar producto", error })
    }
  },
  obtenerEstadisticas: async (req, res) => {
    try {
      // Aquí puedes implementar la lógica para obtener estadísticas
      const estadisticas = {
        totalVentas: 10000,
        nuevosClientes: 100,
        productosMasVendidos: ["Producto 1", "Producto 2"],
      }
      res.json(estadisticas)
    } catch (error) {
      res.status(500).json({ message: "Error al obtener estadísticas", error })
    }
  },
  obtenerMensajes: async (req, res) => {
    try {
      const mensajes = await Pregunta.find()
      res.json(mensajes)
    } catch (error) {
      res.status(500).json({ message: "Error al obtener mensajes", error })
    }
  },
}

module.exports = adminController
