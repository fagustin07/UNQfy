const express = require('express');
const { BadRequest, NotifyError } = require('../../model/errors');
const router = express.Router();
const { getNewsletter, saveNewsletter } = require('../../lib/NewsletterPersistence');

router.post('/subscribe', (req, res) => {
    const { artistId, email } = req.body;

    if (!email) throw new BadRequest();

    const newsletter = getNewsletter();
    newsletter.subscribe(artistId, email);
    saveNewsletter(newsletter);

    res.status(200)
        .json();
});

router.post('/unsubscribe', (req, res) => {
    const { artistId, email } = req.body;

    if (!email) throw new BadRequest();

    const newsletter = getNewsletter();
    newsletter.unsubscribe(artistId, email);
    saveNewsletter(newsletter);

    res.status(200)
        .json();
});

router.route('/subscriptions')
    .get((req, res) => {
        const artistId = req.query.artistId;
        if (!artistId) throw new BadRequest();

        const newsletter = getNewsletter();
        const subscribers = newsletter.getSubscribersForArtistId(artistId);
        res.status(200)
            .json({ artistId: artistId, subscribers: subscribers });
    })
    .delete((req, res) => {
        const artistId = req.body.artistId;

        const newsletter = getNewsletter();
        newsletter.deleteSubscribersOfArtistId(artistId);
        saveNewsletter(newsletter);

        res.status(200)
            .json();
    });

router.post('/notify', (req, res) => {
    const { artistId, subject, message } = req.body;

    if (!subject || !message) throw new BadRequest();

    const newsletter = getNewsletter();
    newsletter.notify(artistId, subject, message)
        .then(() => {
            res.status(200)
                .json({ statusCode: 200 })
        })
        .catch((_) => { throw new NotifyError() });
});

router.get('/heartbeat', (_, res) => {
    res.status(200).send();
});

module.exports = router;
