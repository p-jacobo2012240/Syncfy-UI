var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var RolesValidos={
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'El rol no es valido'
};

//DEFINIENDO MI MODELO
var usuarioSchema = new Schema({
    
    nombre:   { type: String, required: [ true, 'El nombre es necesario' ]},
    email:    { type: String, unique: true, required: [true, 'Correo es necesario' ]},
    password: { type: String, required: [ true, 'Contraseña es necesaria']},
    img:      { type: String, required: false },
    role:     { type: String, required: true, default: 'USER_ROLE', enum: RolesValidos }
});

usuarioSchema.plugin(uniqueValidator,{ message:'{PATH} debe ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);