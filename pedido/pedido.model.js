const mongoose = require('mongoose');

const pedidosSchema = mongoose.Schema(
  {
    // campos
    userID: { type: String, required: true },
    restaurantID: { type: String, required: true },
    estado: {
      type: String,
      required: true,
      enum: [
        'enviado',
        'creado',
        'en curso',
        'en camino',
        'entregado',
      ],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('pedidos', pedidosSchema);