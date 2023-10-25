const express = require("express")
const mongoose = require("mongoose")
require ("dotenv").config()

// Creación de la App
const app = express()

app.use(express.json());

// Enrutado
const userRouter = require('./users/users.controller')
app.use("/api", userRouter)

// Conexión BD
const URL = process.env.MONGO_DB

mongoose.connect(URL,{}).then(()=>{
    console.log("BD is now connected");
}).catch((error)=>{
    console.log(error);
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})
// gutierrezmarchena1702
// otmIOkXNZnG5pfKX