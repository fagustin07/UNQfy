const express = require('express');
const { BadRequest } = require('../../model/errors');
const router = express.Router();
const newsletter = require('../../model/newsletter');

router.post('/subscribe', (req, res) => {
    const { artistId, email } = req.body;

    if (!email) throw new BadRequest();

    newsletter.subscribe(artistId, email);
    res.status(200)
        .json();
});

router.post('/unsubscribe', (req, res) => {
    const { artistId, email } = req.body;

    if (!email) throw new BadRequest();

    newsletter.unsubscribe(artistId, email);
    res.status(200)
        .json();
});

router.route('/subscriptions')
    .get((req, res) => {
        const artistId = req.query.artistId;

        const subscribers = newsletter.getSubscribersForArtistId(artistId);
        res.status(200)
            .json({ artistId: artistId, subscribers: subscribers });
    })
    .delete((req, res) => {
        const artistId = req.body.artistId;

        newsletter.deleteSubscribersOfArtistId(artistId);
        res.status(200)
            .json();
    });

router.post('/notify', (req, res) => {
    const { artistId, subject, message } = req.body;

    if (!subject || !message) throw new BadRequest();

    newsletter.notify(artistId, subject, message);

    res.status(200)
        .json();
});

module.exports = router;