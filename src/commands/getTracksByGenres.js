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

        return ['TRACKS FOUND', unqfy.getTracksMatchingGenres(genres)];
    }
}

module.exports = GetTracksByGenres;