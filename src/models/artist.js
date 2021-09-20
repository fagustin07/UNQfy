const Album = require('./album');
const _idGenerator = require('../lib/IDGenerator');

class Artist {

    constructor(name, country) {
        this.id = _idGenerator.newId();
        this.name = name;
        this.country = country;
        this._albums = {};
    }

    createAlbum({name, year}) {
        const album = new Album(name, year);
        this._albums[album.id] = album;

        return album;
    }

    getTracksByGenres(genres){
        return this.getTracks().filter(aTrack => aTrack.haveGenres(genres) )
    }

    hasAlbum(id) {
        return this._albums[id] !== undefined;
    }

    takeAlbum(id) {
        return this._albums[id];
    }

    albums() {
        return Object.values(this._albums);
    }

    getTracks() {
        return this.albums().reduce((tracks, album) => tracks.concat(album.tracks()), []);
    }

    removeAlbum(anAlbum) {
        delete this._albums[anAlbum.id];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            country: this.country,
            albums: this.albums().map(album => album.toJSON()),
        }
    }
}

module.exports = Artist;