var express = require('express');

var app = express(); 

var path = require('path');
var fs = require('fs'); //FileSystem

app.get('/:tipo/:img', (req, res, next) =>{

    var tipo = req.params.tipo;
    var img =  req.params.img;

    var pathImagen = path.resolve( __dirname,  `../uploads/${ tipo }/${ img }`)

    //Si esta no existiese

    if( fs.existsSync( pathImagen)){
        res.sendFile( pathImagen);
    }else{
        var pathNoImage = path.resolve( __dirname, '../assets/no-img.jpg')  //Imagen Por Defecto
        res.sendFile(pathNoImage);
    }

        /*res.status(200).json({
            ok: true,
            mensage: 'Peticion correcta' 
        })*/
});

module.exports = app;