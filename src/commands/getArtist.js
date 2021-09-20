const Command = require("./Command");

class GetArtist extends Command {

    static command() {
        return 'getArtist';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['FOUND ARTIST', unqfy.getArtistById(id)];
    }

}

module.exports = GetArtist;