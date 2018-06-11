var express = require('express');

var app = express(); 
var jwt = require('jsonwebtoken');

//Middleweare Exportado
var mdAuth = require('../middlewares/auth');

var Hospital = require('../models/hospital');

//============================
//Obtener todos los hospitales
//============================

app.get('/', (req, res, next) =>{

    var desde = req.query.desde || 0; //INIT
    desde = Number(desde);

    
    Hospital.find({},  (err, hospitales) =>  { //Parametros de busqueda
       
        if (err){
            res.status(500).json({
                ok: false,
                mensaje: 'Error critico de base de datos',
                errors: err
            });
        }//Fin If
      
        Hospital.count({}, (err, conteo) =>{
            
            res.status(200).json({
                ok: true,
                hospitales: hospitales,
                cantidad_total: conteo
            });
        });
        
        
    }).skip(desde)    
    .limit(5)
    .populate('usuario', 'nombre email');//Fin de Busqueda 
    
});//Fin del GET


//==============================
//Insertar todos los hospitales
//==============================

app.post('/', mdAuth.verificaToken, (req, res) =>{

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id //El Usuario que lo manda
    });

    hospital.save( (err, hospitalGurdado)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al Insertar Usuario',
                errors: err
            });
        }//Fin del If

        res.status(201).json({
            ok: true,
            hospital: hospitalGurdado
            //AÑADIR AQUI EL TOKEN
        });
    });//Fin del guardar
})//Fin del POST


//=============================
//Actualizar Un Hospital
//=============================

app.put('/:id', mdAuth.verificaToken, (req, res) =>{
    
        var id = req.params.id;
        var body = req.body;
    
        Hospital.findById(id, (err, hospital)=>{
           
           if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error Al actualizar',
                    errors: error
                }); 
           }
           
           if(!hospital){
               return read.status(400).json({
                    ok: false,
                    mensaje: 'El Hospital con el id ' + id + ' no existe',
                    errors: { message: 'No existe un Hospital con ese ID' }
               });
           }
    
           hospital.nombre = body.nombre;
           hospital.usuario =  req.usuario._id
    
           hospital.save( (err, hospitalGurdado)=>{
                
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar un hospital',
                    errors: err
                });
            }
                res.status(200).json({
                   ok: true,
                   hospital: hospitalGurdado     
                })
    
           })//Fin de Guardar Usuario
    
        });//Fin de la Busqueda
    
    });//Fin de PUT

//=============================
//Eliminar Un Hospital
//=============================

app.delete('/:id', (req, res) =>{

    var id = req.params.id;

    Hospital.findByIdAndRemove( id, (err, hospitalBorrado) =>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Hospital Eliminado',
                errors: err
            });
        }

        if( !hospitalBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un hospital con ese id',
                errors: { message: 'No existe un hospital con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });


    });//Fin del Buscar y Eliminar  


});//Fin de DELETE


module.exports = app;