var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


// ==========================================
//  Verificar token
// ==========================================
exports.verificaToken = function(req, res, next) {  //Exportando una funcion
    
        var token = req.query.token;
    
        jwt.verify(token, SEED, (err, decoded) => {
    
            if (err) {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'Token incorrecto',
                    errors: err
                });
            }
    
            req.usuario = decoded.usuario;  //Extraer todo lo que traiga el request
    
            next();
            /*
                res.status(200).json({
                    ok: false,
                    mensaje: 'Operacion Correcta',
                    errors: err
                });
            */ 
    
    
        });
    
    }