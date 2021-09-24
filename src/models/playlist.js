const Recognizable = require('./recognizable');

class Playlist extends Recognizable {
    constructor(name, tracks) {
        super(name);
        this.tracks = tracks;
    }

    duration(){
        return this.tracks.reduce((duration, aTrack) => duration += aTrack.duration, 0);
    }

    hasTrack(track){
        return this.tracks.some(aTrack => aTrack.id === track.id);
    }

    removeTrack(track){
        this.tracks = this.tracks.filter(aTrack => aTrack.id !== track.id);
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            duration: this.duration(),
            tracks: this.tracks.map(track => track.toJSON())
        }
    }
}
module.exports = Playlist;