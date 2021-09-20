const Command = require("./Command");

class GetTracksByGenres extends Command {

    static command() {
        return 'getTracksByGenres';
    }

    makeBeuty(element){
        return super.makeBeuty(element);
    }

    execute(unqfy,args){
        const genres = this.valueOf('--genres', args).split(',').map(genre => genre.trim())

        return ['FOUND TRACKS', unqfy.getTracksMatchingGenres(genres)];
    }
}

module.exports = GetTracksByGenres;