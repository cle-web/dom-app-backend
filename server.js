const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

// Cargar las variables de entorno del archivo .env
dotenv.config();

// Conectar a la base de datos
connectDB();

// Inicializar la aplicación de Express
const app = express();

// Middleware para poder leer datos JSON en las peticiones
// DEBE ESTAR ANTES de las rutas
app.use(express.json());

// Rutas de la API
app.use('/api/auth', require('./src/routes/authRoutes'));

app.use('/api/pedidos', require('./src/routes/pedidoRoutes'));

app.use('/api/repartidor', require('./src/routes/repartidorRoutes'));

// Puerto de escucha del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});