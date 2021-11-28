const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../models/unqfy'); // importamos el modulo unqfy

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data/data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}

function saveUNQfy(unqfy, filename = 'data/data.json') {
    unqfy.save(filename);
}

module.exports = {
    getUNQfy,
    saveUNQfy
};