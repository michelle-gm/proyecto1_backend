const mongoose = require('mongoose');

const restaurantesSchema = mongoose.Schema(
  {
    // campos
    name: {type: String, required: [true, 'Ingresar nombre del restaurante.']},
    dir: {type: String, required: [true, 'Ingresar dirección del restaurante.']},
    categoria: {type: String, required: [true, 'Ingresar categoría del restaurante.']},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('restaurantes', restaurantesSchema);