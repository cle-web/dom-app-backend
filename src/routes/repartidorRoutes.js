const express = require('express');
const { getPedidosDisponibles, aceptarPedido } = require('../controllers/repartidorController');
const router = express.Router();

// Ruta para que el repartidor vea los pedidos disponibles
router.get('/pedidos/disponibles', getPedidosDisponibles);

// Ruta para que el repartidor acepte un pedido
router.post('/pedidos/aceptar', aceptarPedido);

module.exports = router;