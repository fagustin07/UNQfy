require('dotenv').config();
const express = require('express');
const app = express();
const monitor_router = require('./routers/monitor_router.js');
const invalid_router = require('./routers/invalid_router');
const error_handler = require('./error_handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', monitor_router);
app.use('*', invalid_router);

app.use(error_handler);

module.exports = app;