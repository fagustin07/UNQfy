const express = require('express');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();


router.route('')
    .get((req, res) => {
        const name = req.query.name;

        if (name === undefined) {
            res.status(400)
                .json({
                    status: 400,
                    errorCode: "BAD_REQUEST"
                });
        }

        const unqfy = getUNQfy();
        const results = unqfy.searchByPartialName(name);
        res.status(200)
            .json(results.playlists.map((playlist) => playlist.toJSON()));

    })

router.route('/new')
    .post((req, res) => {
        const { name, maxDuration, genres } = req.body;

        try {
            const unqfy = getUNQfy();
            const newPlaylist = unqfy.createPlaylist(name, genres, maxDuration);
            saveUNQfy(unqfy);
            res.status(201)
                .json(newPlaylist.toJSON());
        } catch (exception) {
            res.status(400)
                .json({
                    message: exception.message,
                    status: 400,
                    errorCode: "BAD_REQUEST"
                })
        }

    })

router.route('/byIds').post((req, res) => {
    const { name, tracksIds } = req.body;

    try {
        const unqfy = getUNQfy();
        const newPlaylist = unqfy.createPlaylistByIds(name, tracksIds);
        saveUNQfy(unqfy);
        res.status(201)
            .json(newPlaylist.toJSON());
    } catch (exception) {
        res.status(400)
            .json({
                message: exception.message,
                status: 400,
                errorCode: "BAD_REQUEST"
            })
    }

})

router.route('/:playlistId')
    .get((req, res) => {
        const id = parseInt(req.params.playlistId);

        try {
            const unqfy = getUNQfy();
            const playlist = unqfy.getPlaylistById(id);
            res.status(200)
                .json(playlist.toJSON());
        } catch (exception) {
            res.status(404)
                .json({
                    message: exception.message,
                    status: 404,
                    errorCode: "RESOURCE_NOT_FOUND"
                })
        }

    })
    .delete((req, res) => {
        const id = parseInt(req.params.playlistId);

        try {
            const unqfy = getUNQfy();
            unqfy.removePlaylistById(id);
            saveUNQfy(unqfy);
            res.status(204)
                .json({});
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