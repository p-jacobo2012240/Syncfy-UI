const express = require('express')
const app = express()

//Routes
const appRoutes = require('../routes/app')
const usuarioRoutes = require('../routes/usuario')
const loginRoutes = require('../routes/login')
const busquedaRoutes = require('../routes/busqueda')
const uploadRoutes = require('../routes/upload')
const imagenesRoutes = require('../routes/imagenes')
const actividadRoute = require('../routes/actividad')
const eventoRoute = require('../routes/evento')
const tarjetaRoute = require('../routes/tarjeta')
const pagoRoute = require('../routes/pago')

//Asign-Routes
app.use('/api/v1/users', usuarioRoutes)
app.use('/api/v1/login', loginRoutes)
app.use('/api/v1/busqueda', busquedaRoutes)
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/img', imagenesRoutes)
app.use('/api/v1/actividad', actividadRoute)
app.use('/api/v1/evento', eventoRoute)
app.use('/api/v1/card', tarjetaRoute)
app.use('/api/v1/payment', pagoRoute )
app.use('/', appRoutes)

module.exports  = app