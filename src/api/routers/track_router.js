const express = require('express');
const { BadRequest } = require('../../errors/basics');
const { getUNQfy, saveUNQfy} = require('../../lib/UNQfyPersistence');
const router = express.Router();

router.route('/:trackId/lyrics')
    .get(async (req, res, next) => {
        const id = parseInt(req.params.trackId);

        try {
            if(!id) throw new BadRequest();

            const unqfy = getUNQfy();
            const lyrics = await unqfy.getLyrics(id);
            saveUNQfy(unqfy);
            res.status(200).send(lyrics);
        } catch (err) {
            next(err);
        }
    });

/**
 * @swagger
 * definitions:
 *   Track:
 *     type: object
 *     required:
 *     properties:
 *       id:
 *         type: number
 *         example: 26
 *       name:
 *         type: string
 *         example: Adios nonino
 *       duration:
 *         type: number
 *         example: 266
 *       genres:
 *         type: array
 *         items:
 *           type: string
 *         example: [pop]
 */
module.exports = router;