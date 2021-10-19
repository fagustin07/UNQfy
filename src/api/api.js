const express  = require('express'); 
const bodyParser = require('body-parser');
const artists_router = require('./routers/artist_router.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/artists', artists_router);


module.exports = app