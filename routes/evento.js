var express = require('express');

var app = express();
var jwt = require('jsonwebtoken');


//Middleware de Autenticacion
var mdAuth = require('../middlewares/auth');
//Modelo de Evento
var Evento = require('../models/evento');
var usuario = require('../models/usuario'); 

/*=============================== 
  |  Obtener todos los eventos  | 
  =============================== */

app.get('/', ( req, res, next ) =>{

    var desde = req.query.desde || 0; //Inicializada en cero
    desde = Number(desde);

    
    Evento.find({},  (err, eventos) =>  { //Parametros de busqueda
       
        if (err){
            res.status(500).json({
                ok: false,
                mensaje: 'Error critico de base de datos',
                errors: err
            });
        }//Fin If
      
        Evento.count({}, (err, conteo) =>{
            
            res.status(200).json({
                ok: true,
                eventos: eventos,
                cantidad_total: conteo
            });
        });
        
        
    }).skip(desde)    
    .limit(5)
    .populate('usuario', 'nombre_evento fecha actividad ');//Fin de Busqueda 

});//Fin de Obtener todos los eventos


/*=============================================
  |  Obtener los eventos creados por Usuario  | 
  ============================================= */
  app.get('/xd/:id', ( req, res)=>{

     var id = req.params.id;
               
    Evento.find({}, (err, eventos )=>{

        if( err){
            return res.status(403).json({
                ok: true,
                message: 'no puede continuar',
                errors: err
            })
        }

        if(!eventos){
            return res.status(400).json({
                ok: false,
                message: 'No se encotnro ningun evento asociado al ID:' + id,
                errors: err 
            });
        }

        res.status(200).json({
            ok: true,
            message: 'se encontro su resultado',
            eventos: eventos
        });

    }).where('usuario').equals( id ) //Dinamicamente  
    //.where('usuario').equals('5b846f4633786931e82e453d') //Funcionamiento estatico
    //End-Point localhost:3000/evento/xd/5b846f4633786931e82e453d 
});

/*=========================================
  |   Otener las actividades Asoc IdEvnt  |
  ========================================= */
app.get('/actividades/:idx', (req, res)=>{

    var idx = req.params.idx;

    Evento.find({}, (err, actEvnt)=>{
        if(err){
            return res.status(403).json({
                ok: false,
                message: 'error de DB ',
                errorss: err
            });
        }

        if(!actEvnt){
            return res.status(400).json({
                ok: false,
                message: 'No se envio/obtuvo lo esperado'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Peticion Exxitosa',
            ActRelEvent: actEvnt
        });
    }).where('actividad').equals(idx);
});


/*===========================
  |   Actualizar un evento  |  
  =========================== */
app.put('/:id', (req, res)=>{

    var id = id.params.id;
    var body = req.body;

    Evento.findById( id, ( err, evento )=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'error de base de datos',
                errors: err
            });
        }

        if(!evento){
            return res.status(400).json({
                ok: true,
                mensaje: 'la actividad con el:'+ id + 'no existe',
                errors: { message: 'La actividad no existe o el id es incorrecto'} 
            });
        }

        /*Todo el cuerpo del eelemento*/


        evento.save( (err, eventoGuardado )=>{

            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el evento no pudo ser actualizado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'El evento se ha actualizado correctamente',
                errors: err
            });

        });

    });

});




/*============================
  |    Insertar un evento    |  
  ============================ */

app.post('/', mdAuth.verificaToken, ( req, res)=>{

    var body = req.body;

    var evnto = new Evento({
        nombre_evento: body.nombre_evento,
        fecha: body.fecha,
        usuario: req.usuario._id, //El Usuario que lo manda
        actividad: body.actividad    
    });

    evnto.save( (err, eventoGuardado)=>{

        if(err){
          return  res.status(500).json({
                ok: false,
                mensaje: 'Error al genenerar un nuevo evento',
                errors: err
           });     
        }//fin del if 

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
            //Agregar el token
        });

    }); //Fin de funcion guardar un dato

});//Fin de insertar un nuevo evento


/*====================================
  |      Eliminar un evento          |  
  ====================================*/ 

  app.delete('/:id', (req, res)=>{

    var id = req.params.id;

    Evento.findByIdAndRemove(id, (err, eventoEliminado)=>{
        
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'El evento no pudo ser eliminado',
                errors: err
            });
        }

        if(!eventoEliminado){
            return res.status(400).json({
                ok: true,
                mensaje: 'El evento con el id no existe o no fue encontrado',
                errors: { message: 'No fue encontrado ese medico' }
            });
        }
        
        res.status(200).json({
            ok: true, 
            mensaje: 'EL EVENTO FUE ELIMINADO CORRECTAMENTE',
            evento: eventoEliminado
        });                                
    });
});



module.exports  = app;