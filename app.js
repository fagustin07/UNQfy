const express = require('express');
const bodyParser = require('body-parser');
const { artist } = require('./src/routes/artist')

const rootApp = express();

rootApp.use(bodyParser.urlencoded({ extended: false }))
rootApp.use(bodyParser.json())

rootApp.use('/api', artist);

module.exports = rootApp;