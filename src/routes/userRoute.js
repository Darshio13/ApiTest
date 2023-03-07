var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController")

router.get("/login/:correo/:password", userController.userGet);

router.get("/fecha/:token")

router.post("/post/:nombre/:apellidos/:nombre_usuario/:correo_electronico/:password", userController.userPost);

router.put("/putstatus/:token_tool", userController.userPutEstatus);



module.exports = router;
