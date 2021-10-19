const Recognizable = require('./recognizable');
const musixMatchClient = require('../helpers/clients/musixMatchClient');

class Track extends Recognizable {
    constructor(name, duration, genres, album = null){
        super(name);
        this.duration = duration;
        this.genres = genres;
        this.album = album;
        this._lyrics = null;
    }

    haveGenres(genres){
        return genres.some(aGenre => this.genres.includes(aGenre))
    }

    async getLyrics(){
        if(this._lyrics === null) {
          const lyrics = await musixMatchClient.getLyricsFrom(this);
          this._lyrics = lyrics;
        }

        return this._showLyrics();
    }

    artistName() {
        return this.album.artistName();
    }

    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            duration: this.country,
            genres: this.genres
        }
    }

    _showLyrics() {
        return this.name.toUpperCase() + '\n\n' + this._lyrics;
    }
}

module.exports = Track;