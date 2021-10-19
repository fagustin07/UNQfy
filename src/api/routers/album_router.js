const express = require('express');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        const albumName = req.query.name;
        if (albumName === undefined) {
            res.status(400)
                .json({
                    status: 400,
                    errorCode: "BAD_REQUEST"
                })
        }

        const unqfy = getUNQfy();
        const results = unqfy.searchByPartialName(albumName);

        res.status(200)
            .json(results.albums.map((album) => album.toJSON()));
    })
    .post((req, res) => {
        const { artist_id, name, year } = req.body;

        const unqfy = getUNQfy();
        const album = unqfy.addAlbum(parseInt(artist_id), { name, year: parseInt(year) });
        saveUNQfy(unqfy);

        res.status(201)
            .json(album.toJSON());
    });


router.route('/:album_id')
    .get((req, res) => {
        const album_id = parseInt(req.params.album_id);

        const unqfy = getUNQfy();
        const anAlbum = unqfy.getAlbumById(album_id);

        res.status(200)
            .json(anAlbum.toJSON());
    })
    .patch((req, res) => {
        const album_id = parseInt(req.params.album_id);
        const { year } = req.body;

        const unqfy = getUNQfy();
        const album = unqfy.getAlbumById(parseInt(album_id));
        album.update(year);
        saveUNQfy(unqfy);

        res.status(200)
            .json(album.toJSON());
    })
    .delete((req, res) => {
        const album_id = req.params.album_id;

        const unqfy = getUNQfy();
        unqfy.removeAlbumById(parseInt(album_id));
        saveUNQfy(unqfy);

        res.status(204)
            .json({})
    });

module.exports = router;