const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let actividadSchema = new Schema({
    nombre_actividad: {
        type: String, 
        required: [ true, 'El nombre de la actividad es necesaria'] 
    },
    cantidad_puntos: {
        type: Number, 
        required: [true, 'El nombre de la actividad es necesario' ]
    },
    usuario:  {	 //Usuario que crea la  actividad
        type: Schema.Types.ObjectId,  
        ref: 'Usuario',	
        required: true 
    }
}, { collection: 'actividades' });


module.exports = mongoose.model('Actividad', actividadSchema)