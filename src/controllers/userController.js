const nodemailer = require('nodemailer');

const Usuario = require("../models/usuario");

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

exports.userPost = (req, res) => {
    //Crear token
    var token = crypto.randomBytes(64).toString('hex');
    //Crear usuario en la base de datos
    Usuario.query()
        .insertAndFetch({
            nombre: req.params.nombre,
            apellidos: req.params.apellidos,
            nombre_usuario: req.params.nombre_usuario,
            correo_electronico: req.params.correo_electronico,
            password: req.params.password,
            tipo_usuario: 1,
            token_tool:token
        })
        .then((results) => {
            console.log(results);
            //Configurar correo
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'santos.m.diego.a@gmail.com',
                    pass: 'enbatovbhogpsdyj'
                }
            });
            //Enviar correo;
            const mailOptions = {
                from: 'santos.m.diego.a@gmail.com',
                to: req.params.correo_electronico,
                subject: 'Verificacion de cuenta recetario',
                text: 'Para verificar tu cuenta preciona acceda al siguiente enlace http://localhost:3000/registro/confirmAccount/'+ results.token_tool
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
        .where('id_usuario', '=', req.params.id)
        .patch({
            estatus_confirmacion: 1
        })
        .then((results) => {
            res.json("Se ha verificado al usuario")
        })

}