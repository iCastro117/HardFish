const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  contraseña: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: false
  },
  direccion: {
    type: String,
    required: false
  },
  compras: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compra'
  }],
  rol: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  }
}, {
  timestamps: true
});

// Encriptar contraseña antes de guardar
clienteSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

module.exports = mongoose.model('Cliente', clienteSchema);
