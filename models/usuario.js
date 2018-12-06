const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

let RolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 
        'COLEGIO_ROLE', 'FACILITADOR_ROLE' ],
    message: 'El rol no es valido'
}

const usuarioSchema = new Schema({
    nombre: 
    { 
        type: String, 
        required: [ true, 'El nombre es necesario' ]
    },
    email:
    {
        type: String, 
        unique: true, 
        required: [true, 'Correo es necesario' ]
    },
    password: 
    { 
        type: String, 
        required: [ true, 'Contraseña es necesaria']
    },
    img:
    {
        type: String, 
        required: false 
    },
    role:
    {
        type: String,
        required: true, 
        default: 'USER_ROLE', 
        enum: RolesValidos 
    },
    google:
    { 
        type: Boolean, 
        required: true, 
        default: false 
    }
})

usuarioSchema.plugin(uniqueValidator,{ message:'{PATH} debe ser unico'})

module.exports = mongoose.model('Usuario', usuarioSchema)