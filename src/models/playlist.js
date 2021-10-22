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

    hasDuration(minDuration, maxDuration) {
        return this._hasMinDuration(minDuration) && this._hasMaxDuration(maxDuration);
    }

    _hasMinDuration(minDuration) {
        return isNaN(minDuration) || this.duration() > minDuration; 
    }

    _hasMaxDuration(maxDuration) {
        return isNaN(maxDuration) || this.duration() < maxDuration; 
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