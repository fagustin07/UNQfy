const Command = require("./command");

class RemoveAlbum extends Command {

    static command() {
        return 'removeAlbum';
    }

    execute(unqfy,args){
        const artistId = parseInt(this.valueOf('--id', args));

        return ['ALBUM REMOVED', unqfy.removeAlbumById(artistId)];
    }

    expectedArgsFormatMessage() {
        return 'removeAlbum --id albumId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = RemoveAlbum;