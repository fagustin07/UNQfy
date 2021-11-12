const express = require('express');
const app = express();
const newsletter_router = require('./routers/newsletter_router');
const error_handler = require('./error_handler');
const verif_artist_id = require('../helpers/verify_artistId_middleware')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(verif_artist_id);
app.use('/api', newsletter_router);
app.use(error_handler);


module.exports = app;