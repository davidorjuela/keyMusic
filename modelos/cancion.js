const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var CancionSchema = new Schema({
    artista: String,
    nombre: String,
    album: String,
    anio: String,
    genero: String,
    url: String,
    imagen: String,
    peticiones: String
});

module.exports = mongoose.model('Cancion', CancionSchema);