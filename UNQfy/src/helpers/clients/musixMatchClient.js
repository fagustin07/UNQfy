const axios = require('axios');
const { EntityNotFound } = require('../../errors/model_errors');

const musixmatch_api = axios.create({
    baseURL: process.env.MUSIX_MATCH_API_HOST,
    params: {
        apikey: process.env.MUSIX_MATCH_API_KEY
    }
});

function _searchTrack(track) {
    const artistName = track.artistName();
    const options = {
        params: {
            q_track: track.name,
            q_artist: artistName,
            f_has_lyrics: true
        },
    };

    return musixmatch_api.get('/track.search', options)
        .then((response) => {
            const tracks_result = response.data.message.body.track_list;
            if(tracks_result.length === 0) throw new EntityNotFound('Lyrics');
            return tracks_result[0].track;
        })
        .catch((err) => { throw err; })
}

function _getLyricsByTrackId(trackId) {
    const options = {
        params: {
            track_id: trackId
        }
    }
    return musixmatch_api.get('/track.lyrics.get', options)
        .then((response) => {
            const lyrics = response.data.message.body.lyrics.lyrics_body;
            const wipedLyrics = lyrics
                    .replace('******* This Lyrics is NOT for Commercial use *******', '')
                    .replace(/\([0-9]*\)/, '');

            return wipedLyrics;
        })
        .catch((err) => { throw err; })
}

function getLyricsFrom(track) {
    return _searchTrack(track)
            .then(track => _getLyricsByTrackId(track.track_id))
            .catch(err => { throw err; });
}

module.exports = {
    getLyricsFrom
};
