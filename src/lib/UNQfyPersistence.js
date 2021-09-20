const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('../models/unqfy'); // importamos el modulo unqfy

class UNQfyPersistence {
    // Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
    getUNQfy(filename = 'data.json') {
        let unqfy = new unqmod.UNQfy();
        if (fs.existsSync(filename)) {
            unqfy = unqmod.UNQfy.load(filename);
        }
        return unqfy;
    }

    saveUNQfy(unqfy, filename = 'data.json') {
        unqfy.save(filename);
    }

}

module.exports = UNQfyPersistence;