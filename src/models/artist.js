const Adder = require('./adder');

class Artist extends Adder {

    constructor(name, country) {
        super(name);
        this.country = country;
        this.hasPopulated = false;
    }

    createAlbum(anAlbum) {
        this.addElement(anAlbum);
    }

    getTracksByGenres(genres){
        return this.getTracks().filter(aTrack => aTrack.haveGenres(genres) )
    }

    takeAlbum(id) {
        return this.takeElement(id);
    }

    albums() {
        return this.elements();
    }

    getTracks() {
        return this.albums().reduce((tracks, album) => tracks.concat(album.tracks()), []);
    }

    removeAlbum(anAlbum) {
        this.removeElement(anAlbum);
    }

    populated() {
        this.hasPopulated = true;
    }

    update(name, country) {
        this.name = name;
        this.country = country;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            country: this.country,
        }
    }

    toJSONDetails() {
     return {
         ...this.toJSON(),
         albums: this.albums().map(album => album.toJSON()),
     }   
    }
}

module.exports = Artist;