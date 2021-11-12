const express = require('express');
const app = express();
const newsletter_router = require('./routers/newsletter_router');
const api_error_handler = require('./api_error_handler');
const model_error_handler = require('./model_error_handler');
const verif_artist_id = require('./verify_artistId_middleware');
const NotifyService = require('../model/newsletter');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(verif_artist_id);

app.use('/api', newsletter_router);

app.use(model_error_handler);
app.use(api_error_handler);

module.exports = app;