const mongoose = require('mongoose');

const restaurantesSchema = mongoose.Schema(
  {
    // campos
    correo: { type: String, required: [true, 'Ingresa tu correo electronico.'] },
    name: {type: String, required: [true, 'Ingresa tu nombre.']},
    pass: {type: String, required: [true, 'Ingresa tu contraseña.']},
    celular: {type: String, required: [true, 'Ingresa tu número de celular.']},
    dir: {type: String, required: [true, 'Ingresa tu dirección.']},
    isClient: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('restaurantes', restaurantesSchema);