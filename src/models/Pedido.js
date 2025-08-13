const mongoose = require('mongoose');

// Esquema para los ítems del pedido (productos y cantidad)
const itemSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    default: 1,
  },
});

// Esquema principal del Pedido
const pedidoSchema = mongoose.Schema({
  negocio: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Negocio', // Referencia al modelo de Negocio
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Cliente', // Referencia al modelo de Cliente
  },
  repartidor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repartidor', // Referencia al modelo de Repartidor (opcional al inicio)
  },
  items: [itemSchema], // Un array de ítems en el pedido
  direccion_entrega: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    enum: ['pendiente', 'asignado', 'en_camino', 'entregado', 'cancelado'],
    default: 'pendiente',
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pedido', pedidoSchema);