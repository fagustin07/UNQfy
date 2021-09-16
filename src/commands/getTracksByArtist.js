const Command = require("./command");

class GetTracksByArtist extends Command {

    static command() {
        return 'getTracksByArtist';
    }

    makeBeuty(element){
        return super.makeBeuty(element);
    }

    execute(unqfy,args){
        const artistName = this.valueOf('--artistName', args)

        try {
            return unqfy.getTracksMatchingArtist(artistName);
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    
    }
}

module.exports = GetTracksByArtist;