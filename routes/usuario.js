var express = require('express');
var bcrypt = require('bcrypt');

var app = express(); 
var jwt = require('jsonwebtoken');

//Middleware Exportado
var mdAuth = require('../middlewares/auth');
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
//Actualizar Un Usuario
//=============================
app.put('/:id', mdAuth.verificaToken ,(req, res) => {
    
        var id = req.params.id;
        var body = req.body;                     //Lo que sea que venga del cuerpo  
    
        Usuario.findById(id, (err, usuario) => { //Devolviendo un suario o error
    
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }
    
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id ' + id + ' no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            }
    
    
            usuario.nombre = body.nombre;
            usuario.email = body.email;
            usuario.role = body.role;
    
            usuario.save((err, usuarioGuardado) => {
    
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar usuario',
                        errors: err
                    });
                }

                usuarioGuardado.password = ':).. Te la creiste puto';
    
                    
                res.status(200).json({
                    ok: true,
                    usuario: usuarioGuardado
                });
    
            });
    
        });
    
    });




//=============================
//Insertar Un Usuario
//=============================
app.post('/', mdAuth.verificaToken ,(req, res) =>{

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10 ), //Encriptando
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
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });

    });

});


//=============================
//Eliminar Un Usuario
//=============================


app.delete('/:id', mdAuth.verificaToken ,( req, res)=>{

    var id = req.params.id; //Si son Id son parametros

    Usuario.findByIdAndRemove( id, (err, usuarioBorrado) =>{   //Necesariamente resiviendo 3 parametros

        if(err){
            return res.status(500).json({
                ok: false,
                mensage: 'Usuario eliminado',
                errors: err

            });
        }//Fin del if

        if( !usuarioBorrado){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese id',
                    errors: { message: 'No existe un usuario con ese id' }
                });
        }//Fin del If

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});

module.exports = app;