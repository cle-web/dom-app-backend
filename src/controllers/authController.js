const Cliente = require('../models/Cliente');
const Negocio = require('../models/Negocio');
const Repartidor = require('../models/Repartidor');
const bcrypt = require('bcryptjs');

// Función de ayuda para buscar un usuario en todas las colecciones
const findUserByEmail = async (email) => {
  let user = await Cliente.findOne({ email });
  if (user) return { user, rol: 'cliente' };

  user = await Negocio.findOne({ email });
  if (user) return { user, rol: 'negocio' };

  user = await Repartidor.findOne({ email });
  if (user) return { user, rol: 'repartidor' };
  
  return null;
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { rol, nombre, email, password, telefono, direccion } = req.body;

  try {
    let user;

    if (rol === 'cliente') {
      user = await Cliente.create({ nombre, email, password, direccion, telefono });
    } else if (rol === 'negocio') {
      user = await Negocio.create({ nombre, email, password, direccion, telefono });
    } else if (rol === 'repartidor') {
      user = await Repartidor.create({ nombre, email, password, telefono });
    } else {
      return res.status(400).json({ message: 'Rol de usuario inválido' });
    }
    
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      user: { id: user._id, rol: rol }
    });
    
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// @desc    Iniciar sesión de usuario
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await findUserByEmail(email);

    if (!foundUser) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: { id: foundUser.user._id, rol: foundUser.rol }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { registerUser, loginUser };