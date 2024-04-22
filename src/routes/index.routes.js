const {Router} = require("express");
const router = Router();
const bancosolarRoutes = require("./bancosolar.routes");

//endpoints de secciones
router.use("/", bancosolarRoutes);

module.exports = router;