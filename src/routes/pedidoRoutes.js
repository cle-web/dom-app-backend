const express = require('express');
const { createPedido, getPedidosByCliente } = require('../controllers/pedidoController');
const router = express.Router();

// Ruta para que el negocio cree un pedido
router.post('/', createPedido);

// Ruta para que el cliente obtenga sus pedidos
router.get('/cliente/:id', getPedidosByCliente);

module.exports = router;