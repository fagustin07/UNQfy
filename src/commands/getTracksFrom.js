const Command = require("./command");

class GetTracksFrom extends Command {

    static command() {
        return 'getTracksFrom';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--albumId', args));
        
        return ['TRACKS FOUND', unqfy.getTracksFrom(id)];
    }

    expectedArgsFormatMessage() {
        return 'getTracksFrom --albumId trackAlbumId';
    }

    expectedArgs() {
        return ['--albumId'];
    }

}

module.exports = GetTracksFrom;