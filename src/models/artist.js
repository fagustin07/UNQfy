const Album = require('./album');

class Artist {

    constructor(id, name, country) {
        this.id = id;
        this.name = name;
        this.country = country;
        this._albums = {};
    }

    createAlbum({name, year, id}) {
        const album = new Album(id, name, year);
        this._albums[id] = album;

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