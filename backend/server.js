<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
=======
require('dotenv').config({ path: './backend/.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const adminRoutes = require("./routes/adminRoutes");
>>>>>>> admin-dashboard-usuario-dashboard

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando! 🚀');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conexión a MongoDB exitosa');
=======
// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/admin", adminRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando! 🚀");
});

// Depuración: imprimir el valor de MONGO_URI
console.log("MONGO_URI:", process.env.MONGO_URI);  // Esta línea imprime el valor de MONGO_URI

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conexión a MongoDB exitosa");
>>>>>>> admin-dashboard-usuario-dashboard

    // Iniciar el servidor solo si conecta a la base de datos
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
<<<<<<< HEAD
    console.error('❌ Error de conexión a MongoDB:', error);
=======
    console.error("❌ Error de conexión a MongoDB:", error);
>>>>>>> admin-dashboard-usuario-dashboard
  });
