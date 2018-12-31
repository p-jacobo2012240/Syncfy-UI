const moongose = require('mongoose')
const Schema = moongose.Schema

const pagoSchema = new Schema({
     monto: {
        type: Number,
        required: [ true, 'El monto es necesario'],
    },
    tarjeta: {
        type: Schema.Types.ObjectId,
        ref: 'Tarjeta',
        required: true,
    },
}, {collection: 'pago' })

module.exports = moongose.model('Pago', pagoSchema)
