const express = require('express')
const app = express()
const Tarjeta = require('../models/tarjeta')

app.get('/', async(req, res)=>{
    
    let result

    try {
        result = await Tarjeta.find({}, (err, cardConfig)=>{
            if(err){
                res.send({
                    message: 'Error al buscar la configuracion',
                    errors: err
                }).statusCode(403)
            }

            res.status(200).json({
                ok: true,
                message: 'Consulta exitosa',
                results: cardConfig
            })
        })
    } catch (e) {
        console.error(e)
    }
})

app.get('/:id_card', async(req, res)=>{

    let id_card = req.params.id_card
    let result

    try {
        result = await Tarjeta.findById(id_card, (err, cardOne)=>{
            if(err){
                res.send({
                    message: 'Error de DB',
                    errors: err
                }).statusCode(403)
            }

            res.status(200).json({
                ok: true,
                message: 'Consulta Exitosa',
                results: cardOne
            })
        })    
    } catch (e) {
        return console.error(e)
    }
})

app.post('/', async(req, res)=>{

    let body = req.body
    let result

    let _tarjeta = new Tarjeta({
        datos : body.datos,
        usuario: body.req.usuario.id
        //Otras configuraciones futuras
    })

    /*
          var body = req.body;

    var evnto = new Evento({
        nombre_evento: body.nombre_evento,
        fecha: body.fecha,
        usuario: req.usuario._id, //El Usuario que lo manda
        actividad: body.actividad    
    });

    */
   
    try {
        
        result = await _tarjeta.save( (err, newTarjeta)=>{
            if(err){
                res.send({
                    message: 'Error de Db',
                    errors: err
                }).statusCode(403)
            }

            res.status(200).json({
                message: 'Constula Exitosa',
                results: newTarjeta 
            })
        })
    } catch (e) {
        return console.error(e)
    }
})

module.exports = app