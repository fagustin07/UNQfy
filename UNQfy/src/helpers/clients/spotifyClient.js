const axios = require('axios');
const Album = require('../../models/album');
require('dotenv').config();

const spotify_api = axios.create({
  baseURL: process.env.SPOTIFY_API_HOST,
  headers: {
    Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
  }
});

function searchArtist(artistName) {
    const options = {
        params: {
          type: 'artist',
          q: artistName,
         },
    };
    return spotify_api.get('/search', options);
}

function searchAlbumsById(artistId) {
    return spotify_api.get(`/artists/${artistId}/albums`);
}

function getAlbumsFrom(anArtistName) {
    return searchArtist(anArtistName)
            .then(artist_response => searchAlbumsById(artist_response.data.artists.items[0].id))
            .then(albums_response => albums_response.data.items)
            .then(album_list => {
                const album_unique_list =  [...new Map(album_list.map(item => [item["name"], item])).values()];
                return album_unique_list.map(album => new Album(album.name, parseInt(album.release_date.slice(0,4))))
            })
            .catch(error => {
                throw new Error(error.message);
            });
}

module.exports = {
  getAlbumsFrom
};
