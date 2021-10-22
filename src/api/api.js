const express = require('express');
const artists_router = require('./routers/artist_router.js');
const albums_router = require('./routers/album_router.js');
const users_router = require('./routers/user_router.js');
const playlist_router = require('./routers/playlist_router.js');
const track_router = require('./routers/track_router.js');
const invalid_router = require('./routers/invalid_router.js');
const app = express();
const error_handler = require('./error_handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api/artists', artists_router);
app.use('/api/albums', albums_router);
app.use('/api/users', users_router);
app.use('/api/playlists', playlist_router);
app.use('/api/tracks', track_router);

app.use('*', invalid_router);
app.use(error_handler);




module.exports = app;