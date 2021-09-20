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

    hasTrack(aTrack) {
        return this._tracks[aTrack.id] !== undefined;
    }

    takeTrack(id) {
        return this._tracks[id];
    }

    tracks() {
        return Object.values(this._tracks);
    }
}

module.exports = Album;