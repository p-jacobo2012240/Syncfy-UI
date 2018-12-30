const moongose = require('mongoose')
const Schema = moongose.Schema

const pagoSchema = new Schema({
     monto: {
        cantidad: Float32Array,
        required: true
    },
    tarjeta: {
        type: Schema.Types.ObjectId,
        ref: 'Tarjeta',
        required: true
    }
}, {collection: 'pago' })

module.exports = moongose.model('Pago', pagoSchema)
