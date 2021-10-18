const express = require('express');
const bodyParser = require('body-parser');
const artistRoute = require('./src/routes/artist')

const rootApp = express();

rootApp.use(bodyParser.urlencoded({ extended: false }))
rootApp.use(bodyParser.json())

rootApp.use('/api/artists', artistRoute);

module.exports = rootApp;