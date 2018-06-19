var express = require('express');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
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

        case 'medicos':
            promesa = buscarMedicos(busqueda, regex);
        break;

        case 'hospitales':
            promesa = buscarHospitales(busqueda, regex);
        break;

        default:
        return res.status(400).json({
            ok: false,
            mensaje: 'Los tipos de busqueda sólo son: usuarios, medicos y hospitales',
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
        buscarHospitales( busqueda, regex),
        buscarMedicos( busqueda, regex),
        buscarUsuarios( busqueda, regex)
     ])
    .then( respuestas =>{

        res.status(200).json({
            ok: true,
            hospitales: respuestas[0],
            medicos: respuestas[1],
            usuarios: respuestas[2]
        });
    });

      
});


function buscarHospitales( busqueda, regex  ){

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

function buscarMedicos( busqueda, regex){

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