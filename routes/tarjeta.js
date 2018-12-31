const express = require('express')
const auth = require('../middlewares/auth')
const app = express()
const Tarjeta = require('../models/tarjeta')
const usuario = require('../models/usuario')


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
        
        if(id_card.match(/^[0-9a-fA-F]{24}$/)){
            result = await Tarjeta.findById(id_card, (err, cardOne)=>{
                if(err){
                    res.send({
                        message: 'Error de DB',
                        errors: err
                    })
                }
    
                res.status(200).json({
                    ok: true,
                    message: 'Consulta Exitosa',
                    results: cardOne
                })
            })       
        }else{
            res.send({ 
                message: `el id: ${id_card} debe ser valido` 
            })
        }
    } catch (e) {
        res.status(400).send('Invalid JSON string')
    }
})

app.post('/', auth.verificaToken, async(req, res)=>{

    let body = req.body
    let result

    let tarjetaOBJ = new Tarjeta({
        propietario: body.propietario,
        numero_tarjeta: body.numero_tarjeta,
        fecha_vencimiento: body.fecha_vencimiento,
        numero_secreto: body.numero_secreto,
        usuario: req.usuario, 
    })

    try {
        result = await tarjetaOBJ.save( (err, dataSaved)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    message: 'Consulta exitosa',
                    errors: err
                })
            }

            res.status(201).json({
                ok: true,
                message: 'Consulta Exitosa',
                results: dataSaved   
            })
        })
    } catch (e) {
       return console.log(`Ocurrio una excepcion ${e}`)
    }
})

module.exports = app