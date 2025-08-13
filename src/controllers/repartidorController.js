const Pedido = require('../models/Pedido');
const Repartidor = require('../models/Repartidor');

// @desc    Obtener todos los pedidos con estado "pendiente"
// @route   GET /api/repartidor/pedidos/disponibles
// @access  Private (se debe autenticar el repartidor)
const getPedidosDisponibles = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ estado: 'pendiente' });

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

// @desc    Aceptar un pedido y asignárselo a un repartidor
// @route   POST /api/repartidor/pedidos/aceptar
// @access  Private (se debe autenticar el repartidor)
const aceptarPedido = async (req, res) => {
  try {
    const { pedidoId, repartidorId } = req.body;

    const pedido = await Pedido.findByIdAndUpdate(
      pedidoId,
      { $set: { repartidor: repartidorId, estado: 'asignado' } },
      { new: true }
    );

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    
    // Actualizar el estado del repartidor a "en_camino"
    await Repartidor.findByIdAndUpdate(
      repartidorId,
      { $set: { estado: 'en_camino' } }
    );

    res.status(200).json({
      message: 'Pedido aceptado y asignado exitosamente',
      pedido: pedido,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al aceptar el pedido', error: error.message });
  }
};

module.exports = {
  getPedidosDisponibles,
  aceptarPedido,
};