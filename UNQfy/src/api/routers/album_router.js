const express = require('express');
const { BadRequest } = require('../../errors/api_errors');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        const albumName = req.query.name;

        const unqfy = getUNQfy();
        const results = unqfy.searchByPartialName(albumName);

        res.status(200)
            .json(results.albums.map((album) => album.toJSON()));
    })
    .post((req, res) => {
        const { artistId, name, year } = req.body;
        if(!artistId || !name || !year) throw new BadRequest();

        const unqfy = getUNQfy();
        const album = unqfy.addAlbum(parseInt(artistId), { name, year: parseInt(year) });
        saveUNQfy(unqfy);

        res.status(201)
            .json(album.toJSONDetails());
    });

router.route('/:albumId')
    .get((req, res) => {
        const albumId = parseInt(req.params.albumId);
        if(!albumId) throw new BadRequest();

        const unqfy = getUNQfy();
        const anAlbum = unqfy.getAlbumById(albumId);

        res.status(200)
            .json(anAlbum.toJSONDetails());
    })
    .patch((req, res) => {
        const albumId = parseInt(req.params.albumId);
        const { year } = req.body;
        if(!albumId || !year) throw new BadRequest();

        const unqfy = getUNQfy();
        const album = unqfy.getAlbumById(parseInt(albumId));
        album.update(year);
        saveUNQfy(unqfy);

        res.status(200)
            .json(album.toJSON());
    })
    .delete((req, res) => {
        const albumId = req.params.albumId;
        if(!albumId) throw new BadRequest();

        const unqfy = getUNQfy();
        unqfy.removeAlbumById(parseInt(albumId));
        saveUNQfy(unqfy);

        res.status(204)
            .json({})
    });

module.exports = router;