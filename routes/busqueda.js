var express = require('express');

var app = express();

var Actividad = require('../models/actividad');
var Evento = require('../models/evento');
var Usuario = require('../models/usuario');


//================================================
//  Busqueda Por Coleccion especifica (Individual)
//================================================

app.get('/coleccion/:tabla/:busqueda', (req, res)=>{
         
    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch( tabla ){

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
        break;

        case 'evento':
            promesa = buscarEvento(busqueda, regex);
        break;

        case 'actividad':
            promesa = buscarActividad(busqueda, regex);
        break;

        default:
        return res.status(400).json({
            ok: false,
            mensaje: 'Los tipos de busqueda sólo son: usuarios, evento y actividades',
            error: { message: 'Tipo de tabla/coleccion no válido' }
        });

    }

    promesa.then(data =>{

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    });

});

//================================================
//  Busqueda Por todas las Colecciones (General)
//================================================
app.get('/todo/:busqueda', (req, res, next) =>{

    var busqueda = req.params.busqueda;
    var regex = new RegExp( busqueda, 'i' );


    //Enviando un arreglo de promesas
    Promise.all( [
        buscarActividad( busqueda, regex),
        buscarEvento( busqueda, regex),
        buscarUsuarios( busqueda, regex)
     ])
    .then( respuestas =>{

        res.status(200).json({
            ok: true,
            evento: respuestas[0],
            actividad: respuestas[1],
            usuarios: respuestas[2]
        });
    });

      
});


function buscarActividad( busqueda, regex  ){

    //Componer el cuerpo de esto

    return new Promise((resolve, reject) =>{

        Hospital.find({ nombre: regex }, (err, hospitales) =>{
            if(err){
                reject('Error al cargar o buscar', err); //Si da error   
            }else{
                resolve(hospitales); //Si todo se carga
            }
        }).populate('usuario', 'nombre email') ;

    });
}

function buscarEvento( busqueda, regex){

    //Componer el cuerpo de esto
    return new Promise(( resolve, reject )=>{
      
        Medico.find({ nombre: regex }, (err, medicos)=>{
            if(err){
                 reject('Error al cargar o buscar medicos', err);    
            }else{
                 resolve(medicos)
            }
        }).populate('usuario', 'nombre email')
          .populate('hospital');
    });
}


//Buscando por dos parametros paralelamente
function buscarUsuarios( busqueda, regex  ){
    
    return new Promise( (resolve, reject)=>{

        Usuario.find()
            .or([{ 'nombre': regex }, {'email': regex }])
            .exec( (err, usuarios)=>{

                if(err){
                    reject('No se pudo encontraar', err);
                }else{
                    resolve(usuarios);
                }   

            });
    }); 
}


module.exports = app;