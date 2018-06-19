//REQUIES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//IMPORTANDO RUTAS

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
//INIT
var app = express();

//BODY PARSER CONFIG
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




//INIT de la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    
        if (err) throw err;
    
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online'); //MOSTRARA UNA EXCEPCION SI NO ESTA LEVANTADA LA DB
    
    });


//Defiiendo las rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/', appRoutes);

//Escuchando
app.listen(3000,()=>{
    console.log('Express server en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});

