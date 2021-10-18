const express = require('express');
const unqfy = require('../helpers/mock')

const artist = express();
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
        res.status(201);
        res.json({message: 'Created Artist', ...newArtist.toJSON() });
    } catch (exception) {
        res.status(409);
        res.json({
            message: exception.message,
            status: 409
        })
    }
})

// GET ARTIST BY ID

router.route('/:artistId').get((req, res) => {
    const artistId = req.params.artistId;

    try {
        const anArtist = unqfy.getArtistById(parseInt(artistId));
        res.status(200);
        res.json(anArtist.toJSON());
    } catch (exception) {
        res.status(404);
        res.json({
            message: exception.message,
            status: 404
        })
    }
    
})

// DELETE ARTIST

router.route('/:artistId').delete((req, res) => {
    const artistId = req.params.artistId;

    try {
        unqfy.removeArtistById(parseInt(artistId));
        res.status(204); 
        res.json({})
    } catch (exception) {
        res.status(404);
        res.json({
            message: exception.message,
            status: 404
        })
    }
    
})

// GET ARTISTS BY PARTIAL SEARCH

router.route('/').get((req, res) => {
    const artistName = req.query.name;

    try {
        const results = unqfy.searchByPartialName(artistName);
        res.status(200);
        res.json(results.artists.map((artist) => artist.toJSON())) 
    } catch (exception) {
        res.status(404);
        res.json({
            message: exception.message,
            status: 404
        })
    }
    
})

artist.use('/artists', router)

module.exports={
    artist
}
