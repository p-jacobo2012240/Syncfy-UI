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
    } catch (e) {
        return console.error(e)
    }
})

app.post('/', auth.verificaToken , (req, res)=>{

    let body = req.body

    let tarjetaOBJ = new Tarjeta({
        propietario: body.propietario,
        numero_tarjeta: body.numero_tarjeta,
        fecha_vencimiento: body.fecha_vencimiento,
        numero_secreto: body.numero_secreto,
        usuario: req.usuario, 
    })

    tarjetaOBJ.save( (err, tarjetaGuardada)=>{
        if(err){
            return res.send({
                message: 'Existe un error',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            message: 'Consulta Exitosa',
            results: tarjetaGuardada           
        })
    })
})

module.exports = app