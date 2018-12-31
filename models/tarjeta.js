const mongoose = require('mongoose')
const unicData = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const tarjetaSchema = new Schema({
    propietario : {
        type: String,
        unique: true,
        required: [ true, 'El nombre es requerido']
    },
    numero_tarjeta: {
        type: Number,
        unique: true,
        required: [ true, 'El numero de tarjeta es necesario']
    },
    fecha_vencimiento : {
        type: String,
        required: [true, 'Este numero no puede faltar']
    },
    numero_secreto: {
        type: Number,
        unique: true,
        required: [true, 'Este numero es vital']
    },
    usuario: {
        type: Schema.Types.ObjectId,  
        ref: 'Usuario',	
        required: [ true, 'El id del usuario es requerido' ] 
    }
}, { 
    collection: 'tarjeta' 
})

tarjetaSchema.plugin( unicData, { 
    message: 'los datos deben ser unicos' })

module.exports = mongoose.model('Tarjeta', tarjetaSchema)