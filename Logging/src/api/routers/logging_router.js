const express = require('express');
const { BadRequest, LoggingDesactivated } = require('../../model/errors');
const logger = require('../../model/logger');
const router = express.Router();

router.post('/change', (_, res) => {
    logger.change();

    res.status(200);
    res.json({ statusCode: 200, active: logger.isActive()});
});

router.post('/log', (req, res) => {
    const { message, level, object } = req.body;

    if (!message || !level || !object) throw new BadRequest();

    if(logger.isActive()) {
        logger.log(level, message, object);

        res.status(201);
        res.json({ statusCode: 201 });
    } else {
        throw new LoggingDesactivated();
    }
});

router.get('/heartbeat', (_, res) => {
    res.status(200).send();
});

module.exports = router;