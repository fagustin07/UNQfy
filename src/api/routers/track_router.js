const express = require('express');
const { BadRequest } = require('../../errors/basics');
const { getUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();

router.route('/:trackId/lyrics')
    .get(async (req, res, next) => {
        const id = parseInt(req.params.trackId);
        if(!id) throw new BadRequest();

        try {
            const unqfy = getUNQfy();
            const lyrics = await unqfy.getLyrics(id);
            res.status(200).send(lyrics);
        } catch (err) {
            next(err);
        }
    });

module.exports = router;