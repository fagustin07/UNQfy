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

    getLyrics(){
        if(this._lyrics === null) {
          return musixMatchClient.getLyricsFrom(this)
            .then(track_lyrics => { 
                this._lyrics = track_lyrics;

                return this._showLyrics();
            })
            .catch(err => {throw err;});
        } else {
            return Promise.resolve(this._showLyrics());
        }
    }

    artistName() {
        return this.album.artistName();
    }

    _showLyrics() {
        return this.name.toUpperCase() + '\n\n' + this._lyrics;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            duration: this.country,
            genres: this.genres
        }
    }

    toJSONDetails() {
        return {
            id: this.id,
            name: this.name,
            duration: this.country,
            genres: this.genres
        }
    }
}

module.exports = Track;