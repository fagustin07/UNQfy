const express = require('express');
const app = express();
const newsletter_router = require('./routers/newsletter_router');
const api_error_handler = require('./api_error_handler');
const model_error_handler = require('./model_error_handler');
const artist_id_middleware = require('./verify_artistId_middleware');
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(artist_id_middleware);

app.use('/api', newsletter_router);

app.use(model_error_handler);
app.use(api_error_handler);

module.exports = app;