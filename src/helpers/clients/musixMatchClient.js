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
            q_artist: artistName.toUpperCase()
        },
    };
    return musixmatch_api.get('/track.search', options)
        .then((response) => response.data.message.body.track_list)
        .then((track_list) => track_list.find((track) => track.track.has_lyrics > 0))
        .then((track) =>
            !track
                ? Promise.reject(new Error('No hay letras'))
                : track
        )
        .catch((err) => { throw new Error(err.message) })
}

function getLyricsById(trackId) {
    const options = {
        params: {
            track_id: trackId
        }
    }
    return musixmatch_api.get('/track.lyrics.get', options)
        .then((response) => response.data.message.body.lyrics.lyrics_body)
        .catch((err) => { throw new Error(err.message) })
}

function getLyrics(data) {
    return searchTrack(data.trackName, data.artistName);
}

module.exports = {
    getLyrics,
    getLyricsById
};

// const data = {
//     trackName: 'Farolito',
//     artistName: 'Los piojos'
// }
// console.log(getLyrics(data).then((response) => console.log(response)))