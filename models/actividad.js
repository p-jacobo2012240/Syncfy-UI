const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const actividadSchema = new Schema({
    nombre_actividad: 
    {
        type: String, 
        required: [ true, 'El nombre de la actividad es necesaria'] 
    },
    cantidad_puntos: 
    {
        type: Number, 
        required: [true, 'El nombre de la actividad es necesario' ]
    },
    usuario: 
    {	 
        type: Schema.Types.ObjectId,  
        ref: 'Usuario',	
        required: true 
    }
}, { collection: 'actividades' })

module.exports = mongoose.model('Actividad', actividadSchema)