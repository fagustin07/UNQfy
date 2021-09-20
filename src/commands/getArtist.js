const Command = require("./command");

class GetArtist extends Command {

    static command() {
        return 'getArtist';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['ARTIST FOUND', unqfy.getArtistById(id)];
    }

}

module.exports = GetArtist;