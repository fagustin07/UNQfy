const _idGenerator = require('../lib/IDGenerator');

class Track {
    constructor(name, duration, genres){
        this.id = _idGenerator.newId();
        this.name = name;
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