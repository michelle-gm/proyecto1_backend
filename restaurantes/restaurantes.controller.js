const express = require("express");
const restaurantesRouter = express.Router();
const Restaurante = require("./restaurantes.model");

// Leer un restaurante por ID
restaurantesRouter.get("/restaurante/readID/:_id", async (req, res) => {
  const restauranteID = req.params._id;

  if (restauranteID) {
    // Si se proporciona un ID, buscar por ID
    const restaurante = await Restaurante.findOne({
      _id: restauranteID,
      isDeleted: false,
    });
    res.json(restaurante);
  } else {
    res.status(400).json({ message: "ID inválida" });
  }
});

// Leer un restaurante por categoria o similitud
restaurantesRouter.get("/restaurante/search", async (req, res) => {
  const { categoria, name } = req.query;
  const query = {
    ...(name && { name: { $regex: name, $options: 'i' } }),
    ...(categoria && { categoria: categoria }),
    isDeleted: false,
  };

  try {
    const restaurantes = await Restaurante.find(query);
    res.json(restaurantes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al buscar restaurantes", error: err });
  }
});

// Crear un Restaurante
restaurantesRouter.post("/restaurante/create", async (req, res) => {
  try {
    const { name, dir, categoria, inventario, isDeleted } = req.body;
    let restaurante = new Restaurante({
      name,
      dir,
      categoria,
      inventario,
      isDeleted,
    });
    const result = await restaurante.save();
    return res.status(200).send({
      message: "Restaurante creado correctamente",
      result,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Actualizar un restaurante por ID
restaurantesRouter.put("/restaurante/update", async (req, res) => {
  const restauranteId = req.query._id;
  const { name, dir, categoria, inventario, isDeleted } = req.body;

  try {
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(
      restauranteId,
      { name, dir, categoria, inventario, isDeleted },
      {
        new: true,
      }
    );
    if (updatedRestaurante) {
      res.json(updatedRestaurante);
    } else {
      res.status(404).json({ message: "Restaurante no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el restaurante" });
  }
});

// Inhabilitar un restaurante por ID
restaurantesRouter.delete("/restaurante/delete", async (req, res) => {
  await Restaurante.findByIdAndUpdate(
    req.query._id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  res.json({ message: "Restaurante inhabilitado" });
});

module.exports = restaurantesRouter;
