var express = require('express');

var app = express(); 


//Middleweare Exportado
var mdAuth = require('../middlewares/auth');

var Medico = require('../models/medico');

//============================
//Obtener todos los Medicos
//============================

app.get('/', (req, res, next) =>{
    
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Medico.find({}, (err, medicos) =>{

        if(err){
            re.status(500).json({
                ok: false,
                mensaje: 'No se pudo encontrar el medico Error de base de datos',
                errors: err
            });
        }//Fin if

        Medico.count({}, (err, conteo)=>{
            res.status(200).json({
                ok: true,
                mensage: 'Peticion correcta - Medico', 
                medicos: medicos,
                cantidad_total: conteo
            });
        });
              
    }).skip(desde)
    .limit(5)
    .populate('usuario', 'nombre email')
    .populate('hospital'); 

});//Fin GET


//============================
//Insertar todos los Medicos
//============================

app.post('/', mdAuth.verificaToken, (req, res) =>{

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital,
    });

    medico.save( (err, medicoGuardado)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Errror al guardar Medico',
                errors: err
            });
        }//Fin If

        res.status(201).json({
            ok: true,
            medico: medicoGuardado
        });

    });//Fin del guardar

});//Fin del POST

//============================
//Actualizar todos los Medicos
//============================

app.put('/:id', mdAuth.verificaToken, (req, res) =>{

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Al actualizar Medico',
                errors: error
            }); 
       }
       
       if(!medico){
           return read.status(400).json({
                ok: false,
                mensaje: 'El Medico con el id ' + id + ' no existe',
                errors: { message: 'No existe un Medico con ese ID' }
           });
       }

       medico.nombre = body.nombre;
       medico.usuario = req.usuario._id;
       medico.hospital = body.hospital;

       medico.save( (err, medicoGuardado) =>{
        
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar un Medico',
                errors: err
            });
        }
            
        res.status(200).json({
               ok: true,
               medico: medicoGuardado    
            });

       });


    });//Fin de la busqueda

})//Fin de PUT

//============================
//Eliminar todos los Medicos
//============================

app.delete('/:id', mdAuth.verificaToken, (req, res)=>{

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Medico Boorrado',
                errors: err
            });
        }

        if( !medicoBorrado){
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un Medico con ese id',
                errors: { message: 'No existe un medico con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });
        
    });  

});//Fin Eliminar

module.exports = app;