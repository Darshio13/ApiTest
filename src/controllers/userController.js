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
    .insert({
    nombre:req.params.nombre,
    apellidos:req.params.apellidos,
    nombre_usuario:req.params.nombre_usuario,
    correo_electronico:req.params.correo_electronico,
    password:req.params.password,
    tipo_usuario:1
        
})
    .then((results)=>{
        console.log(results);
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