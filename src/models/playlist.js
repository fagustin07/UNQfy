const _idGenerator = require('../lib/IDGenerator');

class Playlist {
    constructor(name, tracks) {
        this.id = _idGenerator.newId();
        this.name = name;
        this.tracks = tracks
    }

    duration(){
        return this.tracks.reduce((duration, aTrack) => duration += aTrack.duration, 0);
    }

    hasTrack(track){
        return this.tracks.some(aTrack => aTrack.id === track.id);
    }
}
module.exports = Playlist;