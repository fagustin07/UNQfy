const Command = require("./command");

class GetAlbum extends Command {

    static command() {
        return 'getAlbum';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['ALBUM FOUND', unqfy.getAlbumById(id)];
    }

    isADetailsCommand() {
        return true;
    }

    expectedArgsFormatMessage() {
        return 'getAlbum --id albumId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = GetAlbum;