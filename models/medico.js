var mongoose =	require('mongoose');

var Schema =	mongoose.Schema;

var medicoSchema =	new Schema({
	nombre:   {	type: String,  required: [true,	'El	nombre es necesario']	},
	img:      {	type: String,  required: [true,'El	id del hospital es necesario'] },
	usuario:  {	type: Schema.Types.ObjectId,  ref: 'Usuario',	required: true },
	hospital: {	type: Schema.Types.ObjectId,  ref: 'Hospital',	required: false	}
});
module.exports = mongoose.model('Medico', medicoSchema);