const nodemailer = require('nodemailer');
var crypto = require('crypto');

const Usuario = require("../models/usuario");

//Obtener para el login
exports.userGet = (req, res) => {
    Usuario.query()
        .where('correo_electronico', '=', req.params.correo)
        .where('password', '=', req.params.password)
        .then((results) => {
            if (results.length > 0) {
                res.json(results);
            }
            else {
                res.json("No se encontro el usuario")
            }
        })
}

exports.userRegisterDate = (req, res) => {
    Usuario.query()
        .where('token_tool', '=', req.params.token)
        .then((results) => {
            if (results.length > 0) {
                console.log(results);
                a=results[0].fecha_registro;
                console.log(a)
                res.json(results);
            }
            else {
                res.json("No se encontro el usuario")
            }
        })
}

//Registrar usuario
exports.userPost = (req, res) => {
    //Crear token
    var token = crypto.randomBytes(64).toString('hex');
    //Crear fecha de creacion de cuenta
    let today = new Date();
    let date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    //Crear query
    Usuario.query()
        .insertAndFetch({
            nombre: req.params.nombre,
            apellidos: req.params.apellidos,
            nombre_usuario: req.params.nombre_usuario,
            correo_electronico: req.params.correo_electronico,
            password: req.params.password,
            tipo_usuario: 1,
            token_tool: token,
            fecha_registro:dateTime
        })
        .then((results) => {
            console.log(results);
            //Enviar correo
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'santos.m.diego.a@gmail.com',
                    pass: 'enbatovbhogpsdyj'
                }
            });

            const mailOptions = {
                from: 'santos.m.diego.a@gmail.com',
                to: req.params.correo_electronico,
                subject: 'Verificacion de cuenta recetario',
                text: 'Para verificar tu cuenta preciona acceda al siguiente enlace https://recetariowebapp.onrender.com/registro/confirmAccount/' + results.token_tool
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    // do something useful
                }
            });

            res.json("Se registro el usuario")
        })
}

exports.userPutEstatus = (req, res) => {

    Usuario.query()
        .where('token_tool', '=', req.params.token_tool)
        .patch({
            estatus_confirmacion: 1
        })
        .then((results) => {
            res.json("Se ha verificado al usuario")
        })

}