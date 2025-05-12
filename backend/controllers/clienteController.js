const Producto = require("../models/Producto")
const Carrito = require("../models/Carrito")
const Pedido = require("../models/Pedido")
const Pregunta = require("../models/Pregunta")
const { Busqueda } = require("../models/Estadistica")

// Obtener productos con filtros
exports.getProductos = async (req, res) => {
  try {
    const { categoria, precioMin, precioMax, busqueda, ordenar, pagina = 1, limite = 12 } = req.query

    // Construir filtro
    const filtro = {}

    if (categoria) {
      filtro.categoria = categoria
    }

    if (precioMin && precioMax) {
      filtro.precio = { $gte: precioMin, $lte: precioMax }
    } else if (precioMin) {
      filtro.precio = { $gte: precioMin }
    } else if (precioMax) {
      filtro.precio = { $lte: precioMax }
    }

    if (busqueda) {
      filtro.$text = { $search: busqueda }

      // Registrar búsqueda para estadísticas
      const busquedaExistente = await Busqueda.findOne({ termino: busqueda })
      if (busquedaExistente) {
        busquedaExistente.contador += 1
        busquedaExistente.ultimaBusqueda = Date.now()
        await busquedaExistente.save()
      } else {
        await Busqueda.create({ termino: busqueda })
      }
    }

    // Opciones de ordenamiento
    let opcionesOrdenar = {}
    if (ordenar === "precio-asc") {
      opcionesOrdenar = { precio: 1 }
    } else if (ordenar === "precio-desc") {
      opcionesOrdenar = { precio: -1 }
    } else if (ordenar === "recientes") {
      opcionesOrdenar = { createdAt: -1 }
    } else {
      // Por defecto, ordenar por destacados primero
      opcionesOrdenar = { destacado: -1, createdAt: -1 }
    }

    // Calcular paginación
    const skip = (pagina - 1) * limite

    // Ejecutar consulta
    const productos = await Producto.find(filtro).sort(opcionesOrdenar).skip(skip).limit(Number.parseInt(limite))

    // Contar total de productos para la paginación
    const total = await Producto.countDocuments(filtro)

    res.status(200).json({
      success: true,
      count: productos.length,
      total,
      totalPaginas: Math.ceil(total / limite),
      paginaActual: Number.parseInt(pagina),
      data: productos,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener un producto por ID
exports.getProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      })
    }

    res.status(200).json({
      success: true,
      data: producto,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Obtener carrito del usuario
exports.getCarrito = async (req, res) => {
  try {
    let carrito = await Carrito.findOne({ usuario: req.usuario.id }).populate(
      "items.producto",
      "nombre precio imagenes stock",
    )

    if (!carrito) {
      carrito = await Carrito.create({
        usuario: req.usuario.id,
        items: [],
        total: 0,
      })
    }

    res.status(200).json({
      success: true,
      data: carrito,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Añadir producto al carrito
exports.agregarAlCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body

    // Verificar si el producto existe
    const producto = await Producto.findById(productoId)
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      })
    }

    // Verificar stock
    if (producto.stock < cantidad) {
      return res.status(400).json({
        success: false,
        message: "No hay suficiente stock disponible",
      })
    }

    // Buscar o crear carrito
    let carrito = await Carrito.findOne({ usuario: req.usuario.id })
    if (!carrito) {
      carrito = await Carrito.create({
        usuario: req.usuario.id,
        items: [],
        total: 0,
      })
    }

    // Verificar si el producto ya está en el carrito
    const itemIndex = carrito.items.findIndex((item) => item.producto.toString() === productoId)

    if (itemIndex > -1) {
      // Actualizar cantidad si ya existe
      carrito.items[itemIndex].cantidad += cantidad
    } else {
      // Añadir nuevo item
      carrito.items.push({
        producto: productoId,
        cantidad,
        precio: producto.precio,
        nombre: producto.nombre,
        imagen: producto.imagenes[0] || "",
      })
    }

    // Calcular total
    carrito.calcularTotal()
    await carrito.save()

    res.status(200).json({
      success: true,
      data: carrito,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Actualizar cantidad de un producto en el carrito
exports.actualizarCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body

    // Verificar si el producto existe
    const producto = await Producto.findById(productoId)
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      })
    }

    // Verificar stock
    if (producto.stock < cantidad) {
      return res.status(400).json({
        success: false,
        message: "No hay suficiente stock disponible",
      })
    }

    // Buscar carrito
    const carrito = await Carrito.findOne({ usuario: req.usuario.id })
    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado",
      })
    }

    // Encontrar el item en el carrito
    const itemIndex = carrito.items.findIndex((item) => item.producto.toString() === productoId)

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado en el carrito",
      })
    }

    // Actualizar cantidad o eliminar si es 0
    if (cantidad <= 0) {
      carrito.items.splice(itemIndex, 1)
    } else {
      carrito.items[itemIndex].cantidad = cantidad
    }

    // Calcular total
    carrito.calcularTotal()
    await carrito.save()

    res.status(200).json({
      success: true,
      data: carrito,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Eliminar producto del carrito
exports.eliminarDelCarrito = async (req, res) => {
  try {
    const { productoId } = req.params

    // Buscar carrito
    const carrito = await Carrito.findOne({ usuario: req.usuario.id })
    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado",
      })
    }

    // Encontrar el item en el carrito
    const itemIndex = carrito.items.findIndex((item) => item.producto.toString() === productoId)

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado en el carrito",
      })
    }

    // Eliminar item
    carrito.items.splice(itemIndex, 1)

    // Calcular total
    carrito.calcularTotal()
    await carrito.save()

    res.status(200).json({
      success: true,
      data: carrito,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Crear un pedido a partir del carrito
exports.crearPedido = async (req, res) => {
  try {
    const { direccionEnvio, metodoPago } = req.body

    // Verificar datos requeridos
    if (!direccionEnvio || !metodoPago) {
      return res.status(400).json({
        success: false,
        message: "Por favor proporcione dirección de envío y método de pago",
      })
    }

    // Buscar carrito
    const carrito = await Carrito.findOne({ usuario: req.usuario.id })
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El carrito está vacío",
      })
    }

    // Verificar stock de cada producto
    for (const item of carrito.items) {
      const producto = await Producto.findById(item.producto)
      if (!producto || producto.stock < item.cantidad) {
        return res.status(400).json({
          success: false,
          message: `No hay suficiente stock para ${producto ? producto.nombre : "un producto"}`,
        })
      }
    }

    // Crear pedido
    const pedido = await Pedido.create({
      usuario: req.usuario.id,
      items: carrito.items,
      total: carrito.total,
      direccionEnvio,
      metodoPago,
      estadoPago: metodoPago === "contraentrega" ? "pendiente" : "pagado",
    })

    // Actualizar stock de productos
    for (const item of carrito.items) {
      await Producto.findByIdAndUpdate(item.producto, {
        $inc: { stock: -item.cantidad },
      })
    }

    // Vaciar carrito
    carrito.items = []
    carrito.total = 0
    await carrito.save()

    // Actualizar estadísticas (esto se podría hacer con un middleware o un job)
    // Aquí iría el código para actualizar las estadísticas

    res.status(201).json({
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

// Obtener pedidos del usuario
exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id }).sort({ createdAt: -1 })

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

// Obtener un pedido específico
exports.getPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findOne({
      _id: req.params.id,
      usuario: req.usuario.id,
    })

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

// Enviar una pregunta
exports.enviarPregunta = async (req, res) => {
  try {
    const { asunto, contenido, categoria } = req.body

    // Verificar datos requeridos
    if (!asunto || !contenido || !categoria) {
      return res.status(400).json({
        success: false,
        message: "Por favor complete todos los campos requeridos",
      })
    }

    // Crear pregunta
    const pregunta = await Pregunta.create({
      usuario: req.usuario.id,
      asunto,
      contenido,
      categoria,
    })

    res.status(201).json({
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

// Obtener preguntas del usuario
exports.getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find({ usuario: req.usuario.id }).sort({ createdAt: -1 })

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
