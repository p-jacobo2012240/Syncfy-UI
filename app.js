//Global ENVIROMENT CONFIG
require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const chalk = require('chalk')

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


// Global Index/Routes
app.use(require('./config/index-routes'));

mongoose.connection.openUri(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log(`Database: ${chalk.green('[Steam-DB --Online]')}`)
})

app.listen(process.env.PORT,()=>{
    console.log(`Server on Port ${process.env.PORT} ${chalk.green('[Steam-API --Online]')}`)
})

