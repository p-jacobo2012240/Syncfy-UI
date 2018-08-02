var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var credencialSchema = new Shema({

    codigo_raspable: { 
        type: String, required: [ true, 'El codigo Raspable es Necesario' ]
    },
    codigo_barra:    {
        type: String, required: [ true, 'El Codigo de barra es Necesario' ]    
    }

});

module.exports = mongoose.model('Credencial', credencialSchema);