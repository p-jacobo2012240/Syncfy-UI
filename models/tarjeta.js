const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tarjetaSchema = new Schema({
    propietario : {
        type: String,
        required: [ true, 'El nombre es requerido']
    },
    numero_tarjeta: {
        type: String,
        required: [ true, 'El numero de tarjeta es necesario']
    },
    fecha_vencimiento : {
        type: String,
        required: [true, 'Este numero no puede faltar']
    },
    numero_secreto: {
        type: String,
        required: [true, 'Este numero es vital']
    },
    usuario: {
        type: Schema.Types.ObjectId,  
        ref: 'Usuario',	
        required: true 
    }
}, { collection: 'tarjeta' })

module.exports = mongoose.model('Tarjeta', tarjetaSchema)