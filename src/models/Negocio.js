const mongoose = require('mongoose');

// Definir el esquema para los productos del negocio
const productSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: false, // La descripción es opcional
  },
  imagenUrl: {
    type: String,
    required: false, // La URL de la imagen es opcional
  },
});

// Definir el esquema principal del Negocio
const negocioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // El email debe ser único
  },
  telefono: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  coordenadas: {
    lat: { type: Number },
    lng: { type: Number },
  },
  descripcion: {
    type: String,
    required: false,
  },
  productos: [productSchema], // Un array de productos
});

// Exportar el modelo de Negocio
module.exports = mongoose.model('Negocio', negocioSchema);