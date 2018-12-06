const express = require('express');
const bcrypt = require('bcrypt');

const app = express(); 
const jwt = require('jsonwebtoken');

//Middleware 
const mdAuth = require('../middlewares/auth');
const Usuario = require('../models/usuario');


app.get('/', async(req, res, next) =>{
    
    let result    
    let desde = req.query.desde || 0
    desde = Number(desde)

    try {
        result = await Usuario.find({}, 'nombre email img role')
        .skip(desde)    
        .limit(5)
        .exec(     
            
            (err, usuarios)=>{
    
            if(err){
                return  res.status(500).json({
                    ok: false,
                    mensage: 'ERROR DE BASE DE DATOS',
                    errors: err 
                })
            }
    
            Usuario.count({}, (err, conteo ) =>{
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    cantidad_usuarios: conteo
                })
    
            })
        })
    } catch (e) {
        return console.log(e)
    }
})


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

                usuarioGuardado.password = ':)..';
    
                    
                res.status(200).json({
                    ok: true,
                    usuario: usuarioGuardado
                });
    
            });
    
        });
    
    });


app.post('/', async(req, res) =>{ 

    let result
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10 ), 
        img: body.img,
        role: body.role
    })

    try {
        result = await usuario.save( (err, usuarioGuardado) => {
            if(err){
            return  res.status(500).json({
                ok: false,
                mensage: 'ERROR AL INSERTAR EL USUARIO', 
                errors: err
            })
        }
    
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        })
    })

    } catch (e) {
        return console.log(e)    
    }
})


app.delete('/:id', mdAuth.verificaToken, async( req, res)=>{

    let result
    let id = req.params.id

    try {
        result = await Usuario.findByIdAndRemove( id, (err, usuarioBorrado) =>{   
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensage: 'Usuario eliminado',
                    errors: err
    
                })
            }
    
            if( !usuarioBorrado){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese id',
                    errors: { message: 'No existe un usuario con ese id' }
                })
            }
    
            res.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            })
        })

    } catch (e) {
        return console.log(e)
    }
})

module.exports = app;