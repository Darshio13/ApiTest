var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController")

//Obtener login
router.get("/login/:username/:password", userController.userGet);
//Obtener fecha de registro
router.get("/fecha/:token", userController.userRegisterDate)
//Registrar usuarios
router.post("/post/:nombre/:apellidos/:nombre_usuario/:correo_electronico/:password", userController.userPost);
//Actualizar estatus de usuario
router.put("/putstatus/:token_tool", userController.userPutEstatus);
//Enviar correo para actualizar contraseña
router.post("/changePassword/", userController.userUserName);
//Cambiar contraseña
router.put("/changePassword/:token_tool", userController.userPutPassword);



module.exports = router;
