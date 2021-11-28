const Command = require("./command");

class GetTracksByArtist extends Command {

    static command() {
        return 'getTracksByArtist';
    }

    execute(unqfy,args){
        const artistName = this.valueOf('--artistName', args)

        return ['TRACKS FOUND', unqfy.getTracksMatchingArtist(artistName)];    
    }

    expectedArgsFormatMessage() {
        return 'getTracksByArtist --artistName artistName';
    }

    expectedArgs() {
        return ['--artistName'];
    }
}

module.exports = GetTracksByArtist;