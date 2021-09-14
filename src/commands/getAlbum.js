const Command = require("./command");

class GetAlbum extends Command {

    static command() {
        return 'getAlbum';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return unqfy.getAlbumById(id);
    }

}

module.exports = GetAlbum;