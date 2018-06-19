var express = require('express');

var fileUpload = require('express-fileupload');

var app = express(); 

// default options
app.use(fileUpload());


app.put('/', (req, res, next) =>{
    
    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No ha seleccionado nada',
            errors: { message: 'Debe seleccionar algo' }
        });
    }

        //Obteniendo nombre del archivo
        var archivo = req.files.imagen;
        var nombreSegmentado = archivo.name.split('.'); //Delimitado por comas
        var extensionArchivo = nombreSegmentado[nombreSegmentado.length -1];

        //Extensiones validas
        var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
        
        if( extensionesValidas.indexOf( extensionArchivo ) <0 ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Extension no permitida',
                errors: { message: 'las extensiones solo pueden ser' + extensionesValidas.join(', ') }
            });  
        }
        
        res.status(200).json({
            ok: true,
            mensage: 'Peticion correcta',
            Extension: extensionArchivo 
        })
});

module.exports = app;