const nodemailer = require('nodemailer');

const Usuario = require("../models/usuario");

exports.userGet= (req, res)=>{
    Usuario.query()
    .where('correo_electronico', '=', req.params.correo)
    .where('password', '=', req.params.password)
    .then((results)=>{
        if(results.length>0)
        {
            res.json(results);
        }
        else
        {
            res.json("No se encontro el usuario")
        }
    })
}

exports.userPost= (req, res)=>{
    Usuario.query()
    .insertAndFetch({
    nombre:req.params.nombre,
    apellidos:req.params.apellidos,
    nombre_usuario:req.params.nombre_usuario,
    correo_electronico:req.params.correo_electronico,
    password:req.params.password,
    tipo_usuario:1
        
})
    .then((results)=>{
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
            to: results[0].correo_electronico,
            subject: 'Prueba',
            text: 'Correo Exito'
          };

        res.json("Se registro el usuario")
    })
}

exports.userPutEstatus= (req, res)=>{    
    
    Usuario.query()
    .where('id_usuario', '=', req.params.id)
    .patch({
        estatus_confirmacion:1
    })
    .then((results)=>{
        res.json("Se ha verificado al usuario")
    })

}