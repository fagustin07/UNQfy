const express = require('express');
const app = express();
const monitor_router = require('./routers/monitor_router.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', monitor_router);

module.exports = app;