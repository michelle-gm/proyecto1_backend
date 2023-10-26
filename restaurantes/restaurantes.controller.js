const express = require("express");
const restaurantesRouter = express.Router();
const Restaurante = require("./restaurantes.model");

// Leer un restaurante por ID
restaurantesRouter.get("/restaurante/readID/:_id", async (req, res) => {
  const restauranteID = req.params._id;

  if (restauranteID) {
    // Si se proporciona un ID, buscar por ID
    const restaurante = await Restaurante.findById(restauranteID);
    res.json(restaurante);
  } else {
    res.status(400).json({ message: "ID inválida" });
  }
});

// Leer un restaurante por categoria o similitud
restaurantesRouter.get("/restaurante/search", async (req, res) => {
  const { categoria, name } = req.query;
  const query = {};

  if (categoria) {
    query.categoria = categoria;
  }

  if (name) {
    // Usamos una expresión regular para buscar nombres que contengan el término
    query.name = new RegExp(name, "i");
  }

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
    const { name, dir, categoria, isDeleted } =
      req.body;
    let restaurante = new Restaurante({
      name, dir, categoria, isDeleted
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
  const { name, dir, categoria, isDeleted} =
    req.body;

  try {
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(
        restauranteId,
      { name, dir, categoria, isDeleted },
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

// Inhabilitar un restaurante usuario por ID
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
