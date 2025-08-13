const Pedido = require('../models/Pedido');

// @desc    Crear un nuevo pedido (para el Negocio)
// @route   POST /api/pedidos
// @access  Private (se debe autenticar el negocio)
const createPedido = async (req, res) => {
  try {
    const { negocio, cliente, items, direccion_entrega } = req.body;
    
    // Aquí puedes añadir validaciones para los datos recibidos

    const pedido = await Pedido.create({
      negocio,
      cliente,
      items,
      direccion_entrega,
    });

    res.status(201).json({
      message: 'Pedido creado exitosamente',
      pedidoId: pedido._id,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

// @desc    Obtener pedidos de un cliente
// @route   GET /api/pedidos/cliente/:id
// @access  Private (solo el cliente puede ver sus pedidos)
const getPedidosByCliente = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ cliente: req.params.id }).sort({ fecha_creacion: -1 });

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

module.exports = {
  createPedido,
  getPedidosByCliente,
};