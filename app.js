require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Routes
const appRoutes = require('./routes/app')
const usuarioRoutes = require('./routes/usuario')
const loginRoutes = require('./routes/login')
const busquedaRoutes = require('./routes/busqueda')
const uploadRoutes = require('./routes/upload')
const imagenesRoutes = require('./routes/imagenes')
const actividadRoute = require('./routes/actividad')
const eventoRoute = require('./routes/evento')


const app = express()

//CORS-CONFIG
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS"); 
    next();
});

//BODY PARSER CONFIG
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connection.openUri(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online')
})


//Asign-Routes
app.use('/usuario', usuarioRoutes)
app.use('/login', loginRoutes)
app.use('/busqueda', busquedaRoutes)
app.use('/upload', uploadRoutes)
app.use('/img', imagenesRoutes)
app.use('/actividad', actividadRoute)
app.use('/evento', eventoRoute)
app.use('/', appRoutes)


app.listen(process.env.PORT,()=>{
    console.log('Express server en puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})

