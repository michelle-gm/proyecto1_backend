const mongoose = require('mongoose');
const productosSchema = require('../productos/productos.model')

const restaurantesSchema = mongoose.Schema(
  {
    // campos
    name: {type: String, required: [true, 'Ingresar nombre del restaurante.']},
    dir: {type: String, required: [true, 'Ingresar dirección del restaurante.']},
    categoria:  {
      type: [String],
      validate: {
        validator: function (array) {
          return array && array.length > 0;
        },
        message: 'Debe ingresar al menos una categoría.',
      },
    },
    inventario: { type: Array, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('restaurantes', restaurantesSchema);