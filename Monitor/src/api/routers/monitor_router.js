const express = require('express');
const router = express.Router();
const monitor = require('../../model/monitor');

router.post('/change', (_, res) => {
        const active = monitor.change();
        res.status(200);
        res.json({ active });
});

router.get('/heartbeats', (_, res) => {
        res.status(200);
        res.json(monitor.heartbeats());
});

module.exports = router;