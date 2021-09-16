const Command = require("./command");

class GetTracksByGenres extends Command {

    static command() {
        return 'getTracksByGenres';
    }

    makeBeuty(element){
        return super.makeBeuty(element);
    }

    execute(unqfy,args){
        const genres = this.valueOf('--genres', args).split(',').map(genre => genre.trim())

        try {
            return unqfy.getTracksMatchingGenres(genres);
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    
    }
}

module.exports = GetTracksByGenres;