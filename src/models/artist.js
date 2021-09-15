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

    hasAlbum(id) {
        return this._albums[id] !== undefined;
    }

    takeAlbum(id) {
        return this._albums[id];
    }

    albums() {
        return Object.values(this._albums);
    }
}

module.exports = Artist;