var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');  //FileSystem NODEJS

var app = express(); 

var Usuario = require('../models/usuario');
var Actividad = require('../models/actividad');
var Evento = require('../models/evento');
// default options
app.use(fileUpload());


app.put('/:tipo/:id', (req, res, next) =>{
    
    var tipo = req.params.tipo;
    var id = req.params.id;

    //Tipos permitidos

    var tiposPermitidos = ['actividades', 'eventos', 'usuarios'];

    if( tiposPermitidos.indexOf( tipo) < 0){
        return res.status(400).json({
            ok:false,
            mensaje: 'los tipos no son permitidos',
            errors: { message: 'El tipo de archivo no es valido' } 
        });
    }
    //Fin de validacion permitida

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

        //Nombre personalizado
        
        var nombreArchivo =  `${ id }-${ new Date().getMilliseconds()}.${ extensionArchivo }`;    
        
        //Mover el archivo

        var path = `./uploads/${ tipo }/${ nombreArchivo }`; 

        archivo.mv( path, err =>{
            
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al mover el archivo',
                    errors: errors
                });  
            }

            subirPorTipo(tipo, id, nombreArchivo, res );    
      /*  res.status(200).json({
            ok: true,
            mensage: 'Archivo movido',
            Extension: extensionArchivo 
        })*/
        
    });

});


function subirPorTipo(tipo, id, nombreArchivo , res ){ //res porque la respuesta debe ser un json desde aqui

    if(tipo === 'usuarios'){

        Usuario.findById(id, (err, usuarioDB) =>{

            if(!usuarioDB){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }

                });
            }//Fin If 
            
            var pathAntiguo = './uploads/usuarios/' + usuarioDB.img;

            //Si tiene una img la borro
            if (fs.existsSync(pathAntiguo)) {
                fs.unlink(pathAntiguo);
            }

            usuarioDB.img = nombreArchivo;

            usuarioDB.save( (err, usuarioActualizado)=>{

                usuarioActualizado.password = 'xd';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            });


        });        

    }//Fin If Usuarios
    
    if(tipo === 'medicos'){

        Medico.findById(id, (err, medicoDB)=>{

            if(!medicoDB){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El medico no existe',
                    errors: { message: 'Medico no existe' }
                });
            }//Fin de If

            var pathAnt = './uploads/medicos/' + medicoDB.img;
            
            //Si tiene una img la borro
            if (fs.existsSync(pathAnt)) {
                fs.unlink(pathAnt);
            }

            medicoDB.img = nombreArchivo;

            medicoDB.save( (err, medicoActualizado)=>{

                 return  res.status(200).json({
                    ok: true,
                    mensaje: 'Img Actualizada en Medico',
                    medico: medicoActualizado
                });

            });

        });
    }   

    if(tipo === 'hospitales'){

        Hospital.findById(id, (err, hospitalDB) =>{

           if (!hospitalDB){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'hospital no encontrado',
                    errors: { message: 'Hospital no existe' }
                });
            }//Fin if

            var pathAnt = './uploads/hospitales' + hospitalDB.img ;

            //Si ya existe la direccion

            if(fs.existsSync( pathAnt)){
                fs.unlinkSync(pathAnt)
            }

            hospitalDB.img = nombreArchivo;

            hospitalDB.save( (err,hospitalActualizado)=>{
               
                return res.status(200).json({
                    ok: true,
                    mensaje: 'La imagen fua actualizada',
                    hospital: hospitalActualizado
                });
            });

        });

    }

}

module.exports = app;