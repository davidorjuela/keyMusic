
const express = require('express');
const CancionControl = require('../control/cancionControl');

var api = express.Router();

api.post('/cancion', CancionControl.crearCancion);

api.get('/cancion', CancionControl.mostrarCanciones);

api.get('/cancion/:id', CancionControl.mostrarCancion);

api.get('/buscarCanciones/:llave&:valor', CancionControl.buscarCanciones);

api.put('/actualizarCancion/:id', CancionControl.actualizarCancion);

api.delete('/cancion/:id', CancionControl.eliminarCancion);

module.exports = api;