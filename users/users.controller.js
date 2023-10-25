const express = require("express");
const userRouter = express.Router();
const User = require("./users.model");

// Leer un usuario
userRouter.get("/user/read", async (req, res) => {
  const { _id, correo, pass } = req.query;
  const user = await User.findOne({ _id, correo, pass });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

// Crear un usuario
userRouter.post("/user/create", async (req, res) => {
  try {
    const { correo, name, pass, celular, dir, isClient, isAdmin, isDeleted } =
      req.body;
    let user = new User({
      correo,
      name,
      pass,
      celular,
      dir,
      isClient,
      isAdmin,
      isDeleted,
    });
    const result = await user.save();
    return res.status(200).send({
      message: "User creado correctamente",
      result,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Actualizar un usuario por ID
userRouter.put("/user/update", async (req, res) => {
  const userId = req.query._id;
  const {
    correo,
    name,
    pass,
    celular,
    dir,
    isClient,
    isAdmin,
    isDeleted,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { correo, name, pass, celular, dir, isClient, isAdmin, isDeleted },
      {
        new: true,
      }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

// Inhabilitar un usuario por ID
userRouter.delete("/user/delete", async (req, res) => {
  await User.findByIdAndUpdate(
    req.query._id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  res.json({ message: "Usuario inhabilitado" });
});

module.exports = userRouter;
