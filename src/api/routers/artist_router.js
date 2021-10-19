const express = require('express');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router()

const artist = express();

router.route('/')
    .get((req, res) => {
        const artistName = req.query.name;

        if (artistName === undefined) {
            res.status(400)
                .json({
                    status: 400,
                    errorCode: "BAD_REQUEST"
                })
        }
        const unqfy = getUNQfy();
        const results = unqfy.searchByPartialName(artistName);
        res.status(200)
            .json(results.artists.map((artist) => artist.toJSON()));
    })
    .post((req, res) => {
        const name = req.body.name;
        const country = req.body.country;

        const data = {
            name: name,
            country: country
        }

        try {
            const unqfy = getUNQfy();
            const newArtist = unqfy.addArtist(data);
            saveUNQfy(unqfy);
            res.status(201)
                .json({ ...newArtist.toJSON() });
        } catch (exception) {
            res.status(409)
                .json({
                    message: exception.message,
                    errorCode: 'RESOURCE_ALREADY_EXISTS',
                    status: 409
                })
        }
    });


router.route('/:artistId')
    .get((req, res) => {
        const artistId = req.params.artistId;

        try {
            const unqfy = getUNQfy();
            const anArtist = unqfy.getArtistById(parseInt(artistId));
            res.status(200);
            res.json(anArtist.toJSON());
        } catch (exception) {
            res.status(404)
                .json({
                    message: exception.message,
                    errorCode: 'RESOURCE_NOT_FOUND',
                    status: 404
                })
        }

    })
    .delete((req, res) => {
        const artistId = req.params.artistId;

        try {
            const unqfy = getUNQfy();
            unqfy.removeArtistById(parseInt(artistId));
            saveUNQfy(unqfy);
            res.status(204)
                .json({})
        } catch (exception) {
            res.status(404)
                .json({
                    message: exception.message,
                    errorCode: 'RESOURCE_NOT_FOUND',
                    status: 404
                })
        }
    });

module.exports = router
