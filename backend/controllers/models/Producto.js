const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: false // Podrías guardar una URL de imagen
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
