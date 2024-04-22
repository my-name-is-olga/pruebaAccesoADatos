const {Router} = require("express");
const router = Router();
const {pool} = require("../db");

//rutas de las funciones
const {
crearUsuario,
consultarUsuarios,
editarUsuario,
eliminarUsuario,
transferencia,
transferencias
} = require("../controllers/bancosolar.controllers");

//ingresar
router.post("/usuario", crearUsuario); 

//consultar
router.get("/usuarios", consultarUsuarios); 

//modificar
router.put("/usuario", editarUsuario); 

//eliminar
router.delete("/usuario", eliminarUsuario); 

//transferir
router.post("/transferencia", transferencia);

//transferencias
router.get("/transferencias", transferencias);

module.exports = router;