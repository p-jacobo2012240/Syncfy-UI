module.exports.SEED = 'mi-hckencriptxd'
module.exports.CLIENT_ID = '281371971439-i03uo7js2cekjs9a21kloh7luj3sh70h.apps.googleusercontent.com ';

// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  ENVIROMENT
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; 

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/steam';
} else {
    urlDB = 'mongodb://pablo:jswuupa98@ds141661.mlab.com:41661/steam';
}
process.env.URLDB = urlDB;

