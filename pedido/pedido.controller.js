const express = require("express");
const pedidosRouter = express.Router();
const Pedido = require("./pedido.model");

// Leer un pedido por ID
pedidosRouter.get("/pedidos/readID/:_id", async (req, res) => {
  const pedidoID = req.params._id;

  if (pedidoID) {
    // Si se proporciona un ID, buscar por ID
    const pedido = await Pedido.findOne({
      _id: pedidoID,
      isDeleted: false,
    });
    res.json(pedido);
  } else {
    res.status(400).json({ message: "ID inválida" });
  }
});

// Leer un pedido por usuario que realizó, Usuario que envío, Restaurante y/o Fechas
pedidosRouter.get("/pedidos/search", async (req, res) => {
  const { userID, restaurantID, fecha_inicial, fecha_final } = req.query;
  const query = {
    ...(userID && { userID: userID }),
    ...(restaurantID && { restaurantID: restaurantID }),
    ...(fecha_inicial &&
      fecha_final && {
        createdAt: {
          $gte: new Date(fecha_inicial),
          $lt: new Date(fecha_final),
        },
      }),
    isDeleted: false,
  };

  try {
    const pedidos = await Pedido.find(query);
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar pedidos", error: err });
  }
});

// Leer un pedidos sin aceptar
pedidosRouter.get("/pedidos/sinAceptar", async (req, res) => {
  try {
    const pedidos = await Pedido.find({
        estado: 'enviado',
        isDeleted: false,
      });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar pedidos", error: err });
  }
});

// Crear un pedido
pedidosRouter.post("/pedidos/create", async (req, res) => {
  try {
    const { userID, restaurantID, estado, isDeleted } = req.body;
    let pedido = new Pedido({
      userID,
      restaurantID,
      estado,
      isDeleted,
    });
    const result = await pedido.save();
    return res.status(200).send({
      message: "Pedido creado correctamente",
      result,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Actualizar un pedido por ID
pedidosRouter.put("/pedido/update", async (req, res) => {
  const pedidoId = req.query._id;
  const { userID, restaurantID, estado, isDeleted} =
    req.body;

  try {
    const updatedPedido = await Pedido.findByIdAndUpdate(
        { _id:pedidoId, estado: 'creado', isDeleted: false },
      { userID, restaurantID, estado, isDeleted },
      {
        new: true,
      }
    );
    if (updatedPedido) {
      res.json(updatedPedido);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el pedido" });
  }
});

// Inhabilitar un pedido por ID
pedidosRouter.delete("/pedido/delete", async (req, res) => {
  await Pedido.findByIdAndUpdate(
    req.query._id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  res.json({ message: "Pedido inhabilitado" });
});

module.exports = pedidosRouter;
