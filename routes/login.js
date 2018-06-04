var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();                         //Sin express no levanta la instancia
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {
    
        var body = req.body;
    
        Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }//Fin del If
    
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - email',
                    errors: err
                });
            }//Fin del If
    
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: err
                });
            }//Fin del If
    
            // Se Crear Token!!
            usuarioDB.password = ':)...pto'
            var token = jwt.sign({ usuario: usuarioDB }, SEED , { expiresIn:  14400  });

               
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id
            });
    
        })
            
    });


module.exports = app;