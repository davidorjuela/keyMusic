/* 
    Vamos a crear el manejo de rutas de express para nuestra API 
    se encargara de manejar las rutas del lado backend
*/

const express = require('express');
const UsuarioControl = require('../control/usuarioControl'); // Importamos el controlador de las funciones
const multipart =require('connect-multiparty'); //importamos el paquete 
const subirImgDirectorio= multipart({uploadDir:'./archivos/usuarios'});  //ruta de archivos

var api = express.Router(); // Cargamos el manejador de rutas de Express

/* 
    Estos son denominados metodos HTTP y hacen parte de las caracteristicas de una API 
    POST -> Agregar datos
    GET -> Obtener los datos
    PUT -> Actualizar datos
    DELETE -> Eliminar datos
    
*/

// Declaracion de las rutas que daran paso a la ejecucion de las funciones 
// Tuta Registro usuario

api.post('/registro', UsuarioControl.crearUsuario);
// Ruta login usuario
// en el caso de un logi o un inicio de sesion utilizamos el emtodo POST en vez de GET
api.post('/loginUsuario', UsuarioControl.login);

//
api.put('/actualizarUsuario/:id', UsuarioControl.actualizarUsuario);

api.put('/subirImagenUsuario/:id', subirImgDirectorio, UsuarioControl.subirImagen);

api.get('/mostrarImagenUsuario/:imageFile', subirImgDirectorio, UsuarioControl.mostrarImagen);

// Exportación del archivo usuarioRutas
module.exports = api;