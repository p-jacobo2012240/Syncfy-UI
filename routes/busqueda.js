var express = require('express');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

app.get('/todo/:busqueda', (req, res, next) =>{

    var busqueda = req.params.busqueda;
    var regex = new RegExp( busqueda, 'i' );


    //Enviando un arreglo de promesas
    Promise.all( [
        buscarHospitales( busqueda, regex),
        buscarMedicos( busqueda, regex )
     ])
    .then( respuestas =>{

        res.status(200).json({
            ok: true,
            hospitales: respuestas[0],
            medicos: respuestas[1]
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
        });

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
        });
    });
}


module.exports = app;