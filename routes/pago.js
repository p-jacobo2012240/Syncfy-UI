const express = require('express')
const app = express()
const auth = require('../middlewares/auth')
const pago = require('../models/pago')

app.get('/', (req, res)=>{

    pago.find({}, (err, PaymentDb)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                message: 'Error de Db',
                errors: err
            })
        }

        res.status(201).json({
            ok: true,
            message: 'Consulta Exitosa',
            results: PaymentDb
        })
    }).populate('tarjeta', 'propietario usuario')  
    //Falta filtrar por el id del usuario que concuerde con sus tarjetas -> pagos realizados
})


app.post('/', auth.verificaToken, async(req, res)=>{

    let body = req.body

    let pagoObj = new pago({
        monto: body.monto,
        tarjeta: body.tarjeta        
    })

    try {
        result = await pagoObj.save( (err, savePayment)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    message: 'Error de Db',
                    errors: err
                })
            }

            res.status(201).json({
                ok: true,
                message: 'Consulta Exitosa',
                results: savePayment
            })
        })
    } catch (e) {
        return res.send({ message: 'La informacion no es valida'})
    }
})

module.exports = app