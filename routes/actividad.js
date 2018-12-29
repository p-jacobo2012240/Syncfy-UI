const express = require('express')
const app = express()

//Middleweare Auth
const mdAuth = require('../middlewares/auth')
const Actividad = require('../models/actividad')

app.get('/', async(req, res, next) =>{
    
    let result
    let desde = req.query.desde || 0
    desde = Number(desde)
    
    try {    
        result = await Actividad.find({}, (err, actividades) =>{
            if(err){
                re.status(500).json({
                    ok: false,
                    mensaje: 'Error de base de datos',
                    errors: err
                })
            }

            Actividad.count({}, (err, conteo)=>{
                res.status(200).json({
                    ok: true,
                    mensage: 'Peticion correcta - Actividades', 
                    actividades: actividades,
                    cantidad_total: conteo
                })
            })
              
        }).skip(desde)
        .limit(5)
        .populate('usuario', 'nombre_actividad cantidad_puntos  usuarios_asignado')
        .populate('actividad') 

    } catch (e) {
        return next(e)
    }
})



//END-POINT SIN PAGINAR
//{{url}}/actividad/sin_paginar
app.get('/sin_paginar', async(req, res)=>{
   
    let result
    
    try {        
        result = await Actividad.find({}, (err, results)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    message: 'error de db',
                    results
                })
            }
    
            res.status(200).json({
                ok: true,
                message: 'consulta exitosa',
                results
            })
        })

    } catch (e) {
        return console.log(e)
    }
})



app.post('/', mdAuth.verificaToken, async(req, res) =>{

    let result
    let body = req.body

    let actividad = new Actividad({
        nombre_actividad: body.nombre_actividad,
        cantidad_puntos: body.cantidad_puntos,
        usuario: req.usuario._id,
    })

    try {
        result = await actividad.save( (err, actividadGuardada)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al crear la actividad',
                    errors: err
                })
            }
    
            res.status(201).json({
                ok: true,
                actividad:  actividadGuardada
            })
        })

    } catch (e) {
        return console.error(e)
    }
})


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