const Cancion = require('../modelos/cancion'); 

function crearCancion(req, res){

    var cancion = new Cancion();

    var parametros = req.body;
    
    cancion.artista = parametros.artista;
    cancion.nombre = parametros.nombre;
    cancion.album = parametros.album;
    cancion.anio = parametros.anio;
    cancion.genero = parametros.genero;
    cancion.url = null;
    cancion.imagen = null;

    cancion.save((err, cancionNuevo)=>{
        if(err){
            res.status(500).send({ message: "Error en el servidor"});
        } else {
            if(!cancionNuevo){

                res.status(200).send({message: "No fue posible subir la canción"});
            } else {
                res.status(200).send({cancion: cancionNuevo});
            }
        }
    });
}

function actualizarCancion(req,res){
    var cancionId = req.params.id;
    var nuevosDatosCancion = req.body;

    Cancion.findByIdAndUpdate(cancionId, nuevosDatosCancion, (err, cancionActualizada)=>{
        if(err){
            res.status(500).send({message:"Error en elservidor"});
        }
        else{
            if(!cancionActualizada){
                res.status(200).send({message:"No fue posible actualizar los datos"});
            }
            else{
                res.status(200).send({Cancion: cancionActualizada});
            }
        }
    });
}

function mostrarCancion(req,res){
    var cancionId = req.params.id;

    Cancion.findById(cancionId, (err, cancionM)=>{
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }
        else{
            if(!cancionM){
                res.status(200).send({message:"No fue posible mostrar la canción"});
            }
            else{
                res.status(200).send({Cancion: cancionM});
            }
        }
    });
}

function mostrarCanciones(req,res){

    Cancion.find({}, (err, canciones)=>{
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }
        else{
            if(!canciones){
                res.status(200).send({message:"No fue posible mostrar las canciónes"});
            }
            else{
                res.status(200).send({Cancion: canciones});
            }
        }
    });
}

function buscarCanciones(req,res){
    var llave = req.params.llave;
    var valor = req.params.valor;
    // var valorN = valor.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    // console.log(valorN);

    function sinAcento(cad) {
        cad= cad.replace(/a/ig, '[a,á]')
           .replace(/e/ig,'[e,é]')
           .replace(/i/ig,'[i,í]')
           .replace(/o/ig,'[o,ó]')
           .replace(/u/ig,'[u,ü,ú]');
           return cad;
   }
    switch(llave){
        
        case "artista":var busqueda={artista:{$regex:sinAcento(valor), $options:'i'}};break;
        case "album":var busqueda={album:{$regex:sinAcento(valor), $options:'i'}};break;
        case "anio":var busqueda={anio:{$regex:sinAcento(valor), $options:'i'}};break;
        case "genero":var busqueda={genero:{$regex:sinAcento(valor), $options:'i'}};break;
        case "nombre":
        default:var busqueda={nombre:{$regex:sinAcento(valor), $options:'i'}};
    }

    Cancion.find(busqueda, '_id nombre artista', (err, resultado)=>{
        
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }
        else{  
            if(resultado.length==0){
                res.status(200).send({message:"No fue posible encontrar alguna canción"});
            }
            else{
                res.status(200).send({Resultado: resultado});
            }
        }
    });
}

function eliminarCancion(req,res){
    var cancionId = req.params.id;

    Cancion.findByIdAndDelete({_id:cancionId}, (err, cancionD)=>{
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }
        else{
            if(!cancionD){
                res.status(200).send({message:"No fue posible eliminar la canción"});
            }
            else{
                res.status(200).send({Cancion: cancionD});
            }
        }
    });
}

module.exports = {
    crearCancion,
    mostrarCancion,
    mostrarCanciones,
    buscarCanciones,
    actualizarCancion,
    eliminarCancion
}