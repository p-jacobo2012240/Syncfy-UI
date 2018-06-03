var express = require('express');

var app = express(); 

var Usuario = require('../models/usuario');


//============================
//Obtener todos los usuarios
//============================
app.get('/', (req, res, next) =>{
    
    Usuario.find({}, 'nombre email img role') //SOLO DESEO VER ESTOS ARGUMENTOS ya no se ve el pssword
        .exec(     //Ejecutando todo el cuerpo
        
        (err, usuarios)=>{

        if(err){//Inicio If
            return  res.status(500).json({
                ok: false,
                mensage: 'ERROR DE BASE DE DATOS',
                errors: err 
            })
        }//Fin If
        
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        })
    });
        
     
});

//=============================
//Insertar Un Usuario
//=============================
app.post('/', (req, res) =>{

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });

    usuario.save( (err, usuarioGuardado) => {

        if(err){//Inicio If
            return  res.status(500).json({
                ok: false,
                mensage: 'ERROR AL INSERTAR EL USUARIO', 
                errors: err
            })
        }//Fin If

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });

    });

});
module.exports = app;