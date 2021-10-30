const express = require('express');
const { options } = require('./swagger/swagger-config');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options);
const app = express();

const artists_router = require('./routers/artist_router.js');
const albums_router = require('./routers/album_router.js');
const users_router = require('./routers/user_router.js');
const playlist_router = require('./routers/playlist_router.js');
const track_router = require('./routers/track_router.js');
const invalid_router = require('./routers/invalid_router.js');
const model_error_handler = require('./model_error_handler');
const api_error_handler = require('./api_error_handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/artists', artists_router);
app.use('/api/albums', albums_router);
app.use('/api/users', users_router);
app.use('/api/playlists', playlist_router);
app.use('/api/tracks', track_router);
app.use('*', invalid_router);

app.use(model_error_handler);
app.use(api_error_handler);

module.exports = app;