const express = require('express');
const { BadRequest } = require('../../model/errors');
const router = express.Router();
const newsletter = require('../../model/newsletter')

router.post('/subscribe', (req, res) => {
    const { artistId, email } = req.body;

    if (!artistId || !email) throw new BadRequest();

    newsletter.subscribe(req.body.artistId, req.body.email);
    res.status(200)
        .json();
});

router.post('/unsubscribe', (req, res) => {
    const { artistId, email } = req.body;

    if (!artistId || !email) throw new BadRequest();

    newsletter.unsubscribe(artistId, email);
    res.status(200)
        .json();
}
);

module.exports = router;