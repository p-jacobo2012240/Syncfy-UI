require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const chalk = require('chalk')

//Routes
const appRoutes = require('./routes/app')
const usuarioRoutes = require('./routes/usuario')
const loginRoutes = require('./routes/login')
const busquedaRoutes = require('./routes/busqueda')
const uploadRoutes = require('./routes/upload')
const imagenesRoutes = require('./routes/imagenes')
const actividadRoute = require('./routes/actividad')
const eventoRoute = require('./routes/evento')
const tarjetaRoute = require('./routes/tarjeta')


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
    console.log(`Database: ${chalk.green('[Steam-DB --Online]')}`)
})


//Asign-Routes
app.use('/api/v1/usuario', usuarioRoutes)
app.use('/api/v1/login', loginRoutes)
app.use('/api/v1/busqueda', busquedaRoutes)
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/img', imagenesRoutes)
app.use('/api/v1/actividad', actividadRoute)
app.use('/api/v1/evento', eventoRoute)
app.use('/api/v1/tarjeta', tarjetaRoute)
app.use('/', appRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server on Port ${process.env.PORT} ${chalk.green('[Steam-API --Online]')}`)
})

