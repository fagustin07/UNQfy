const axios = require('axios');
const { response } = require('express');

const musixmatch_api = axios.create({
    baseURL: 'http://api.musixmatch.com/ws/1.1',
    params: {
        apikey: 'fad874e461e9c5d209590f09c61f2ca3'
    }
});

function searchTrack(trackName, artistName) {
    const options = {
        params: {
            q_track: trackName.toUpperCase(),
            q_artist: artistName.toUpperCase(),
            f_has_lyrics: true
        },
    };
    return musixmatch_api.get('/track.search', options)
        .then((response) => response.data.message.body.track_list)
        .catch((err) => { throw new Error(err.message) })
}

function getLyricsByTrackId(trackId) {
    const options = {
        params: {
            track_id: trackId
        }
    }
    return musixmatch_api.get('/track.lyrics.get', options)
        .then((response) => response.data.message.body.lyrics.lyrics_body)
        .catch((err) => { throw new Error(err.message) })
}

function getTrack(data) {
    return searchTrack(data.trackName, data.artistName)
        .then((track_list) =>
            track_list.length === 0
                ? Promise.reject(new Error('No hay letras'))
                : track_list[0]
        )
}

module.exports = {
    getTrack,
    getLyricsByTrackId
};
