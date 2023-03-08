var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController")

router.get("/login/:username/:password", userController.userGet);

router.get("/fecha/:token", userController.userRegisterDate)

router.post("/post/:nombre/:apellidos/:nombre_usuario/:correo_electronico/:password", userController.userPost);

router.put("/putstatus/:token_tool", userController.userPutEstatus);

router.put("/changePassword/:token_tool", userController.userUserName);



module.exports = router;
