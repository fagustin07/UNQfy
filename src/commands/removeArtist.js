const Command = require("./command");

class RemoveArtist extends Command {

    static command() {
        return 'removeArtist';
    }

    execute(unqfy,args){
        const artistId = parseInt(this.valueOf('--id', args));

        return ['ARTIST REMOVED', unqfy.removeArtistById(artistId)];
    }

    expectedArgsFormatMessage() {
        return 'removeArtist --id artistId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = RemoveArtist;