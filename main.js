

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./src/models/unqfy'); // importamos el modulo unqfy
const AddArtist = require('./src/controllers/AddArtist.js')
const GetArtist = require('./src/controllers/GetArtist.js')
const Controller = require('./src/controllers/Controller.js')

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

//Private
let _controller = new Controller();
_controller.addCommand(new AddArtist());
_controller.addCommand(new GetArtist());

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/
function neededInfo() {
  return {
    unqfy: getUNQfy(),
    command: process.argv[2],
    args: process.argv.splice(3)
  }
}

function execute(unqfy, command, args) {
  return _controller.execute(unqfy, command, args);
}

function main() {
  const { unqfy, args, command } = neededInfo();

  console.log(execute(unqfy, command, args));

  saveUNQfy(unqfy);
}

main();
