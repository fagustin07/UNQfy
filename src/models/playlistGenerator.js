const Playlist = require('./playlist');
const Pair = require('../lib/pair');

class PlaylistGenerator {

    createPlaylist(name, genres, tracks, maxDuration) {
        const playlistTracks = 
            this._obtainTracksUntilMaxDuration(
                this._tracksMatchingGenres(genres, tracks),
                maxDuration
            )

        return new Playlist(name, playlistTracks);
    }

    generateThisIs(anArtist, playedTracksPair) {
        const tracks = anArtist.albums().reduce((tracks, album) => tracks.concat(album.tracks()), []);
        const uniqueKeys = tracks.map(aTrack => aTrack.id)

        const tracksAndTimesListen =
            uniqueKeys.reduce((map, aTrackId) => {
                map[Number(aTrackId)] =
                    playedTracksPair
                        .filter(playedTrackPair => playedTrackPair.fst.id === parseInt(aTrackId))
                        .reduce((totalPlayed, trackPair) => totalPlayed + trackPair.snd, 0);
                return map;
            }, {});

        const take = (stringId) => tracks.find(track => track.id === parseInt(stringId));
        const topThree =
            Object.entries(tracksAndTimesListen)
                .map(([trackId, totalPlayed]) => new Pair(take(trackId), totalPlayed))
                .sort((a, b) => (a.snd > b.snd) ? -1 : 1)
                .slice(0, 3)
                .map(trackListenPair => trackListenPair.fst);

        return new Playlist('This is... ' + anArtist.name, topThree);
    }

    _tracksMatchingGenres(genres, tracks) {
        return tracks.filter(track => track.haveGenres(genres)).flat();
    }

    _obtainTracksUntilMaxDuration(tracks, maxDuration) {
        const obtainedTracks = [];
        tracks.forEach(aTrack => {
            if (maxDuration > 0 && maxDuration >= aTrack.duration) {
                obtainedTracks.push(aTrack);
                maxDuration -= aTrack.duration;
            }
        });

        return obtainedTracks;
    }
}

module.exports = PlaylistGenerator;