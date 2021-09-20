const Playlist = require("../models/playlist");

class PlaylistManager {
    constructor(artistManager) {
        this._playlist = {};
        this._artistManager = artistManager;
    }

    createPlaylist(name, genresToInclude, maxDuration) {
        if (this._exists(name, this._playlistArray())) throw new Error('Playlist alredy exists');

        const tracksByGenre = this._artistManager.getTracksMatchingGenres(genresToInclude);
        const tracks = this._agroupTracksByMaxDuration(tracksByGenre, maxDuration);

        const newPlaylist = new Playlist(name, tracks);
        this._playlist[newPlaylist.id] = newPlaylist;

        return newPlaylist;
    }

    getPlaylistById(id) {
        return this._getOrThrow(id, this._playlistArray(), "Playlist not found");
    }

    //PRIVATE

    _agroupTracksByMaxDuration(tracks, maxDuration) {
        const tracksAgrouped = [];
        tracks.forEach(aTrack => {
            if (maxDuration > 0 && maxDuration >= aTrack.duration) {
                tracksAgrouped.push(aTrack);
                maxDuration -= aTrack.duration;
            }
        });
        return tracksAgrouped;
    }

    _getOrThrow(id, anArray, msgError) {
        let maybeElement = anArray.find(element => element.id === id);
        if (!maybeElement) throw new Error(msgError);

        return maybeElement;
    }

    _playlistArray() {
        return Object.values(this._playlist);
    }

    _exists(anElement, anArray) {
        return anArray.some(anElementInArray => anElementInArray.name.toLowerCase() === anElement.toLowerCase())
    }

}

module.exports = PlaylistManager;