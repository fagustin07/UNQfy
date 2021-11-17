const axios = require('axios');

const BASE_URL = process.env.NEWSLETTER_API_HOST;

const notifyNewAlbum = (album) => {
    return axios.post(BASE_URL + '/api/notify', {
        artistId: album.artist.id,
        subject: `New album from ${album.artistName()}`,
        message: `One of your subscribed artists, ${album.artistName()} 
        released a new album called ${album.name}.\nRegards\n- UNQfy Team.`
    });
}
const notifyDeleteArtist = (artist) => {
    return axios.delete(BASE_URL + '/api/subscriptions', { data: { artistId: artist.id } })
}

module.exports = {
    notifyNewAlbum,
    notifyDeleteArtist
}