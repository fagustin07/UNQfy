const express = require('express');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();
const { BadRequest } = require('../../errors/basics');

router.route('/')
    .get((req, res) => {
        const artistName = req.query.name;

        const unqfy = getUNQfy();
        const results = unqfy.searchByPartialName(artistName);
        res.status(200)
            .json(results.artists.map((artist) => artist.toJSON()));
    })
    .post((req, res) => {
        const { name, country } = req.body;
        if (!name || !country) throw new BadRequest();

        const unqfy = getUNQfy();
        const newArtist = unqfy.addArtist({ name, country });
        saveUNQfy(unqfy);
        res.status(201)
            .json(newArtist.toJSON());
    });


router.route('/:artistId')
    .get((req, res) => {
        const artistId = parseInt(req.params.artistId);
        if (!artistId) throw new BadRequest();

        const unqfy = getUNQfy();
        const anArtist = unqfy.getArtistById(artistId);
        res.status(200);
        res.json(anArtist.toJSON());

    })
    .patch((req, res) => {
        const artistId = parseInt(req.params.artistId);
        const { name, country } = req.body;
        if(!artistId || !name || !country) throw new BadRequest();

        const unqfy = getUNQfy();
        const artist = unqfy.getArtistById(artistId);
        artist.update(name, country);
        saveUNQfy(unqfy);

        res.status(200)
            .json(artist.toJSON());
    })
    .delete((req, res) => {
        const artistId = req.params.artistId;
        if (!artistId) throw new BadRequest();

        const unqfy = getUNQfy();
        unqfy.removeArtistById(parseInt(artistId));
        saveUNQfy(unqfy);
        res.status(204)
            .json({})

    });

module.exports = router;