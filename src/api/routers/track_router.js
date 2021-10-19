const express = require('express');
const { getUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();

router.route('/:trackId/lyrics')
    .get((req, res) => {
        const id = parseInt(req.params.trackId);

        try {
            const unqfy = getUNQfy();
            const track = unqfy.getTrackById(id);
            const lyrics = unqfy.getLyrics(id);
            res.status(200)
                .json({
                    Name: track.name,
                    lyrics: lyrics
                })
        } catch (exception) {
            res.status(404)
                .json({
                    message: exception.message,
                    status: 404,
                    errorCode: "RESOURCE_NOT_FOUND"
                })
        }
    })

module.exports = router;

