const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tarjetaSchema = new Schema({
    tarjeta: {
        propietario: String,
        numero_tarjeta : String,
        fecha_vencimiento: String,
        numero_secreto: String,
        required: [ true, 'los datos de la tarjeta son requeridos'] 
    },
    usuario: {
        type: Schema.Types.ObjectId,  
        ref: 'Usuario',	
        required: true 
    }
}, { collection: 'tarjeta' })

module.exports = mongoose.model('Tarjeta', tarjetaSchema)