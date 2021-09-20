const Command = require("./command");

class GetArtist extends Command {

    static command() {
        return 'getArtist';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['ARTIST FOUND', unqfy.getArtistById(id)];
    }

    expectedArgsFormatMessage() {
        return 'getArtist --id artistId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = GetArtist;