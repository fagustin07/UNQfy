const Track = require("./track");
const _idGenerator = require('../lib/IDGenerator');

class Album {

    constructor(name, year) {
        this.id = _idGenerator.newId();
        this.name = name;
        this.year = year;
        this._tracks = {};
    }

    createTrack({name, duration, genres}){
        const track = new Track(name,duration,genres);
        this._tracks[track.id] = track;

        return track;
    }

    removeTrack(aTrack) {
        delete this._tracks[aTrack.id];
    }

    hasTrack(track) {
        return this._tracks[track.id] !== undefined;
    }

    takeTrack(id) {
        return this._tracks[id];
    }

    tracks() {
        return Object.values(this._tracks);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            year: this.year,
            tracks: this.tracks().map(track => track.toJSON()),
        }
    }
}

module.exports = Album;