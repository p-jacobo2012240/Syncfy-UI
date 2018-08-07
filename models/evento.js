var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventoSchema = new Schema({
    nombre_evento: {
        type: String, required: [ true, 'El nombre del evento es necesario']
    },
    fecha: {
        type: String, required: [true, 'La Fecha del evento es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario',	required: true 
    },
    actividad: {
        type: Schema.Types.ObjectId, ref: 'Actividad', required: false    
    }

}, {collection: 'eventos'});

module.exports = mongoose.model('Evento', eventoSchema )