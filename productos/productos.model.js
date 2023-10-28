const mongoose = require('mongoose');

const productosSchema = mongoose.Schema(
  {
    // campos
    restauranteID: { type: String, required: true },
    name: {type: String, required: [true, 'Ingresar nombre del producto.']},
    descrip: {type: String, required: [true, 'Ingresar la descripción del producto.']},
    precio: {type: Number, required: [true, 'Ingresar precio del producto']},
    categoria: {type: String, required: [true, 'Ingresar categoría del producto']},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('productos', productosSchema);