const express = require('express');
const unqfy = require('../helpers/mock')

const router = express.Router()

// CREATE ARTIST

router.route('/').post((req, res) => {
    const name = req.body.name;
    const country = req.body.country;

    const data = {
        name: name,
        country: country
    }

    try {
        const newArtist = unqfy.addArtist(data);
        res.status(201)
            .json({ message: 'Created Artist', ...newArtist.toJSON() });
    } catch (exception) {
        res.status(409)
            .json({
                message: exception.message,
                errorCode: 'RESOURCE_ALREADY_EXISTS',
                status: 409
            })
    }
})

// GET ARTIST BY ID

router.route('/:artistId').get((req, res) => {
    const artistId = req.params.artistId;

    try {
        const anArtist = unqfy.getArtistById(parseInt(artistId));
        res.status(200)
            .json(anArtist.toJSON());
    } catch (exception) {
        res.status(404)
            .json({
                message: exception.message,
                errorCode: 'RESOURCE_NOT_FOUND',
                status: 404
            })
    }

})

// DELETE ARTIST

router.route('/:artistId').delete((req, res) => {
    const artistId = req.params.artistId;

    try {
        unqfy.removeArtistById(parseInt(artistId));
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

})

// GET ARTISTS BY PARTIAL SEARCH

router.route('/').get((req, res) => {
    const artistName = req.query.name;

    if (artistName === undefined) {
        res.status(400)
            .json({
                status: 400,
                errorCode: "BAD_REQUEST"
            })
    }

    const results = unqfy.searchByPartialName(artistName);
    res.status(200)
        .json(results.artists.map((artist) => artist.toJSON()))
})

module.exports = router
