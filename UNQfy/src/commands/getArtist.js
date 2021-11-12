const Command = require("./command");

class GetArtist extends Command {

    static command() {
        return 'getArtist';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['ARTIST FOUND', unqfy.getArtistById(id)];
    }

    isADetailsCommand() {
        return true;
    }

    expectedArgsFormatMessage() {
        return 'getArtist --id artistId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = GetArtist;