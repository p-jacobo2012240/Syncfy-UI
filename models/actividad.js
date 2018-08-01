var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var actividadSchema = new Schema({
    //TODA LA LOGICA DEL MODELLO
}, { collection: 'actividades' });


module.exports = mongoose.model('Actividad', actividadSchema);