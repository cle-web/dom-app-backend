const mongoose = require('mongoose');

const repartidorSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  coordenadas: {
    lat: { type: Number },
    lng: { type: Number },
  },
  estado: {
    type: String,
    enum: ['disponible', 'en_camino', 'no_disponible'],
    default: 'disponible',
  },
});

module.exports = mongoose.model('Repartidor', repartidorSchema);