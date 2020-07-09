var express = require('express');
var app = express();

var Usuario = require('../models/usuarios.js');
const bcrypt = require('bcrypt');



//Get Usuarios
app.get('/', (req, resp, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role google')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {
                if (err) {
                    return resp.status(500).json({
                        mensaje: 'Error cargando usuarios',
                        ok: false,
                        errors: err
                    });
                }

                Usuario.count({}, (err, conteo) => {

                    resp.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: conteo
                    });

                })
            });
});

//Crear un nuevo usuario mdAutentication.verificaToken,
app.post('/', (request, resp) => {

    var body = request.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password != null ? bcrypt.hashSync(body.password, 10) : null,
        img: body.img,
        role: body.role,

    });
    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return resp.status(400).json({
                mensaje: 'Error al crear usuarios',
                ok: false,
                errors: err
            });
        }
        resp.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            token: request.usuario
        });

    });
})


//Actualizar usuario
app.put('/:id', (req, resp) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return resp.status(500).json({
                mensaje: 'Error al buscar usuario',
                ok: false,
                errors: err
            });
        }

        if (!usuario) {
            return resp.status(400).json({
                mensaje: 'El usuario con el id:' + id + ' no existe',
                ok: false,
                errors: { message: ' No existe usuario con el ID' }
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return resp.status(400).json({
                    mensaje: 'Error al actualizar usuario',
                    ok: false,
                    errors: err
                });
            }

            usuarioGuardado.password = ':)'

            resp.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
                message: 'usuario actualizado con el id' + id
            });

        })

    });

})





module.exports = app