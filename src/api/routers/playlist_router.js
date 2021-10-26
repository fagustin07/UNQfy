const express = require('express');
const { BadRequest } = require('../../errors/basics');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();


router.route('/')
    .get((req, res) => {
        const { name, durationLT, durationGT } = req.query;

        const unqfy = getUNQfy();
        const playlists = unqfy.searchPlaylists({name, durationLT: parseInt(durationLT), durationGT: parseInt(durationGT)});
        res.status(200)
            .json(playlists.map((playlist) => playlist.toJSON()));
    })
    .post((req, res) => {
        const { name, maxDuration, genres, tracks } = req.body;

        if(!name) { new BadRequest() }

        const isByGenres = (maxDuration  && genres && genres.length > 0) && (!tracks)
        const isByIds = (!maxDuration && !genres) && (tracks && tracks.length > 0)

        const unqfy = getUNQfy();
        let playlist;
        
        if (isByGenres) {
            playlist = unqfy.createPlaylist(name, genres, maxDuration);    
        } else if (isByIds) {
            playlist = unqfy.createPlaylistByIds(name, tracks);
        } else {
            throw new BadRequest();
        }

        saveUNQfy(unqfy);
        res.status(201)
            .json(playlist.toJSON());
    });

router.route('/:playlistId')
    .get((req, res) => {
        const id = parseInt(req.params.playlistId);
        if(!id) throw new BadRequest();

        const unqfy = getUNQfy();
        const playlist = unqfy.getPlaylistById(id);
        res.status(200)
            .json(playlist.toJSONDetails());
    })
    .delete((req, res) => {
        const id = parseInt(req.params.playlistId);
        if(!id) throw new BadRequest();

        const unqfy = getUNQfy();
        unqfy.removePlaylistById(id);
        saveUNQfy(unqfy);
        res.status(204)
            .json({});
    });


module.exports = router;