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
        propietario: body.propietario,
        numero_tarjeta: body.numero_tarjeta,
        fecha_vencimiento: body. fecha_vencimiento,
        numero_secreto: body.numero_secreto,
        usuario: req.usuario._id
    })
    
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