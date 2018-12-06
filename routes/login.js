const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SEED = require('../config/config').SEED;

const app = express();                         
const Usuario = require('../models/usuario');

// Google
const CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// =================================================
//  Autenticación de Google
// =================================================
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {

    var token = req.body.token;

    var googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                mensaje: 'Token no válido'
            });
        });


    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (usuarioDB) {

            if (usuarioDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Debe de usar su autenticación normal'
                });
            } else {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id
                });
            }

        } else {
            // El usuario no existe... hay que crearlo
            var usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';


            usuario.save((err, usuarioDB) => {

                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id
                });

            });

        }


    });




    // return res.status(200).json({
    //     ok: true,
    //     mensaje: 'OK!!!',
    //     googleUser: googleUser
    // });


});


//==================================
// Login Normal
//==================================
app.post('/', async(req, res) => {

    let result
    let body = req.body;

    try {
        result = await Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                })
            }
    
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - email',
                    errors: err
                })
            }
    
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: err
                })
            }
    
            usuarioDB.password = 'hck'
            let token = jwt.sign({ 
                usuario: usuarioDB 
            }, SEED, 
            { expiresIn:  14400  })
   
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                menu: obtenerMenu( usuarioDB.role )
            })
        })

    } catch (e) {
        return console.log(e)
    }
})
    
const obtenerMenu = (ROL)=>{
    let menu = [
            {
              titulo: 'Principal',
              icono: 'fa fa-rocket',
              submenu: [
                {titulo: 'Dashboard', url: '/dashboard'},
                {titulo: 'ProgressBar', url: '/progress'},
                {titulo: 'Graficas', url: '/grafica1'},
                {titulo: 'Configuraciones', url: '/account'},
                {titulo: 'Promesas', url: '/promesas'}
              ]
            },
            {
              titulo: 'Intereses',
              icono: 'mdi mdi-folder-lock-open',
              submenu: [
                //{ titulo: 'Usuarios', url: '/usuarios' }
                //{ titulo: 'Hospitales', url: '/hospitales' },
                //{ titulo: 'Médicos', url: '/medicos' }
              ]
            },
            {
              titulo: 'Eventos',
              icono: 'fa fa-address-book',
              evntmenu: [
                    //Todas las rutas del menu
              ]
            }
          ]
               
        //Configuraciones por Rol 
        if (ROL === 'ADMIN_ROLE') {
            menu[1].submenu.unshift({  titulo: 'Usuarios', url: '/usuarios' });
        }

        if(ROL === 'FACILITADOR_ROLE' | ROL === 'ADMIN_ROLE' ){
            menu[2].evntmenu.unshift({ titulo: 'Crear Eventos', url: '/eventos'});         
        }

    return menu;
}


module.exports = app;