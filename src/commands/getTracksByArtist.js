const Command = require("./Command");

class GetTracksByArtist extends Command {

    static command() {
        return 'getTracksByArtist';
    }

    execute(unqfy,args){
        const artistName = this.valueOf('--artistName', args)

        return ['FOUND TRACKS', unqfy.getTracksMatchingArtist(artistName)];    
    }
}

module.exports = GetTracksByArtist;