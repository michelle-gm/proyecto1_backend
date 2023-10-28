const express = require("express");
const productosRouter = express.Router();
const Producto = require("./productos.model");

// Leer un producto por ID
productosRouter.get("/producto/readID/:_id", async (req, res) => {
  const productoID = req.params._id;

  if (productoID) {
    // Si se proporciona un ID, buscar por ID
    const producto = await Producto.findOne({
      _id: productoID,
      isDeleted: false,
    })
    res.json(producto)
  } else {
    res.status(400).json({ message: "ID inválida" })
  }
});

// Leer un producto por restaurante y/o categoria
productosRouter.get("/producto/search", async (req, res) => {
  const { restauranteID, categoria } = req.query;
  const query = {
    ...(restauranteID && { restauranteID: restauranteID }),
    ...(categoria && { categoria: categoria}),
    isDeleted: false,
  };

  try {
    const productos = await Producto.find(query);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar productos", error: err });
  }
});

// Crear un Producto
productosRouter.post("/producto/create", async (req, res) => {
  try {
    const { restauranteID, name, descrip, precio, categoria, isDeleted } =
      req.body;
    let producto = new Producto({
      restauranteID,
      name,
      descrip,
      precio,
      categoria,
      isDeleted,
    });
    const result = await producto.save();
    return res.status(200).send({
      message: "Producto creado correctamente",
      result,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Actualizar un producto por ID
productosRouter.put("/producto/update", async (req, res) => {
  const productoId = req.query._id;
  const { restauranteID, name, descrip, precio, categoria, isDeleted } =
    req.body;

  try {
    const updatedProducto = await Producto.findByIdAndUpdate(
      productoId,
      { restauranteID, name, descrip, precio, categoria, isDeleted },
      {
        new: true,
      }
    );
    if (updatedProducto) {
      res.json(updatedProducto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

// Inhabilitar un producto por ID
productosRouter.delete("/producto/delete", async (req, res) => {
  await Producto.findByIdAndUpdate(
    req.query._id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  res.json({ message: "Producto inhabilitado" });
});

module.exports = productosRouter;
