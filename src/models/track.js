const Recognizable = require('./recognizable');

class Track extends Recognizable {
    constructor(name, duration, genres){
        super(name);
        this.duration = duration;
        this.genres = genres;
    }

    haveGenres(genres){
        return genres.some(aGenre => this.genres.includes(aGenre))
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            duration: this.country,
            genres: this.genres,
        }
    }
}

module.exports = Track;