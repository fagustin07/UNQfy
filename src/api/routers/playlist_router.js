const express = require('express');
const { BadRequest } = require('../../errors/basics');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();


router.route('/')
    .get((req, res) => {
        const name = req.query.name;
        if(!name) throw new BadRequest();

        const unqfy = getUNQfy();
        const results = unqfy.searchByPartialName(name);
        res.status(200)
            .json(results.playlists.map((playlist) => playlist.toJSON()));
    })
    .post((req, res) => {
        const { name, maxDuration, genres } = req.body;
        if (!name || !maxDuration || !genres) throw new BadRequest();

        const unqfy = getUNQfy();
        const newPlaylist = unqfy.createPlaylist(name, genres, maxDuration);
        saveUNQfy(unqfy);
        res.status(201)
            .json(newPlaylist.toJSON());
    });

router.route('/byIds')
    .post((req, res) => {
        const { name, tracksIds } = req.body;
        if (!name || !tracksIds) throw new BadRequest();

        const unqfy = getUNQfy();
        const newPlaylist = unqfy.createPlaylistByIds(name, tracksIds);
        saveUNQfy(unqfy);
        res.status(201)
            .json(newPlaylist.toJSON());
    });

router.route('/:playlistId')
    .get((req, res) => {
        const id = parseInt(req.params.playlistId);
        if(!id) throw new BadRequest();

        const unqfy = getUNQfy();
        const playlist = unqfy.getPlaylistById(id);
        res.status(200)
            .json(playlist.toJSON());
    })
    .delete((req, res) => {
        const id = parseInt(req.params.playlistId);
        if(!id) throw new BadRequest();

        const unqfy = getUNQfy();
        unqfy.removePlaylistById(id);
        saveUNQfy(unqfy);
        res.status(204)
            .json({});
        res.status(404)
            .json({
                message: exception.message,
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            })
    });


module.exports = router;