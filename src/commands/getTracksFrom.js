const Command = require("./command");

class GetTracksFrom extends Command {

    static command() {
        return 'getTracksFrom';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--artistId', args));
        
        return ['TRACKS FOUND', unqfy.getTracksFrom(id)];
    }

    expectedArgsFormatMessage() {
        return 'getTracksFrom --artistId artistTrackOwnerId';
    }

    expectedArgs() {
        return ['--artistId'];
    }

}

module.exports = GetTracksFrom;