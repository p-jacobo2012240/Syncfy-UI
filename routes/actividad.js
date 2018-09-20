var express = require('express');

var app = express(); 


//Middleweare Exportado
var mdAuth = require('../middlewares/auth');

var Actividad = require('../models/actividad');

/*=================================
  | Obtener todas las actividades |
  =================================*/

app.get('/', (req, res, next) =>{
    
    //Paginacion de las actividades
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Actividad.find({}, (err, actividades) =>{

        if(err){
            re.status(500).json({
                ok: false,
                mensaje: 'Error de base de datos',
                errors: err
            });
        }//Fin if

        Actividad.count({}, (err, conteo)=>{
            res.status(200).json({
                ok: true,
                mensage: 'Peticion correcta - Actividades', 
                actividades: actividades,
                cantidad_total: conteo
            });
        });
              
    }).skip(desde)
    .limit(5)
    .populate('usuario', 'nombre_actividad cantidad_puntos  usuarios_asignado')
    .populate('hospital'); 

});//Fin GET



//END-POINT SIN PAGINAR
//{{url}}/actividad/sin_paginar
app.get('/sin_paginar', (req, res)=>{

    Actividad.find({}, (err, results)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                message: 'error de db',
                results
            });
        }

        res.status(200).json({
            ok: true,
            message: 'consulta exitosa',
            results
        });
    });
});


/*=================================
  |      Insertar Actividades     |
  =================================*/

app.post('/', mdAuth.verificaToken, (req, res) =>{

    var body = req.body;

    var actividad = new Actividad({
        nombre_actividad: body.nombre_actividad,
        cantidad_puntos: body.cantidad_puntos,
        usuario: req.usuario._id,
    });

    actividad.save( (err, actividadGuardada)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear la actividad',
                errors: err
            });
        }//Fin If

        res.status(201).json({
            ok: true,
            actividad:  actividadGuardada
        });

    });//Fin del guardar

});//Fin del POST

/*=================================
  |    Actualizar las actividad   |
  =================================*/

app.put('/:id', mdAuth.verificaToken, (req, res) =>{

    var id = req.params.id;
    var body = req.body;

    Actividad.findById(id, (err, actividad)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la actividad',
                errors: error
            }); 
       }
       
       if(!actividad){
           return read.status(400).json({
                ok: false,
                mensaje: 'La actividad con el id ' + id + ' no existe',
                errors: { message: 'No existe una actividad con ese ID' }
           });
       }

       actividad.nombre_actividad = body.nombre_actividad,
       actividad.cantidad_puntos = body.cantidad_puntos,
       actividad.usuario = req.usuario._id;
       //actividad.usuarios_asignados = body.usuarios_asignados;

       actividad.save( (err, actividadGuardada ) =>{
        
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar Actividad',
                errors: err
            });
        }
            
        res.status(200).json({
               ok: true,
               actividad: actividadGuardada    
            });

       });


    });//Fin de la busqueda

})//Fin de PUT

/*===================================
  |  Eliminar todas las actividades |  
  ===================================*/

app.delete('/:id', mdAuth.verificaToken, (req, res)=>{

    var id = req.params.id;

    Actividad.findByIdAndRemove(id, (err, actividadBorrada) => {

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Actividad Borrada',
                errors: err
            });
        }

        if( !actividadBorrada){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una actividad con ese _id',
                errors: { message: 'No existe una actividad con ese _id' }
            });
        }

        res.status(200).json({
            ok: true,
            actividad: actividadBorrada
        });
        
    });  

});//Fin Eliminar

module.exports = app;