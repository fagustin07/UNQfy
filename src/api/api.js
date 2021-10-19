const express  = require('express'); 
const bodyParser = require('body-parser');
const artists_router = require('./routers/artist_router.js');
const albums_router = require('./routers/album_router.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/artists', artists_router);
app.use('/api/albums', albums_router);


module.exports = app