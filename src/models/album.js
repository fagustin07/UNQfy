const Track = require("./track");

class Album {

    constructor(id, name, year) {
        this.id = id;
        this.name = name;
        this.year = year;
        this._tracks = {};
    }

    createTrack({name, duration, genres,id}){
        const track = new Track(id,name,duration,genres);
        this._tracks[id] = track;

        return track;
    }

    hasTrack(id) {
        return this._tracks[id] !== undefined;
    }

    takeTrack(id) {
        return this._tracks[id];
    }

    tracks() {
        return Object.values(this._tracks);
    }
}

module.exports = Album;