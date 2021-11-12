const Recognizable = require('./recognizable');
const Pair = require('../lib/pair');

class User extends Recognizable {
    constructor(username) {
        super(username);
        this.tracksListened = {};
    }

    get username() { return this.name; }

    listen(aTrack) {
        if(this._alreadyListen(aTrack)) {
            this._addListenTrack(aTrack);
        } else {
            this.tracksListened[aTrack.id] = new Pair(aTrack, 1);
        }
    }

    listenPlaylist(aPlaylist) {
        aPlaylist.tracks.forEach(track => this.listen(track));
    }

    timesListened(aTrack) {
        const trackPair = this.tracksListened[aTrack.id];

        return (trackPair!==undefined) ? trackPair.snd : 0;
    }

    tracksListenedPair() {
        return Object.values(this.tracksListened);
    }
    
    _alreadyListen(aTrack) {
        return this.tracksListened[aTrack.id] !== undefined;
    }

    _addListenTrack(aTrack) {
        const trackPair = this.tracksListened[aTrack.id];
        trackPair.snd += 1;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            tracksListened: Object.values(this.tracksListened).map(trackPair => trackPair.fst.toJSON())
        };
    }

    toJSONDetails() {
        return {
            ...this.toJSON(),
            tracksListened: Object.values(this.tracksListened).map(trackPair => trackPair.fst.toJSON())
        };
    }
}

module.exports = User;