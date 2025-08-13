const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clienteSchema = mongoose.Schema({
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
  direccion: {
    type: String,
    required: true,
  },
});

// Encriptar la contraseña antes de guardarla
clienteSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Cliente', clienteSchema);