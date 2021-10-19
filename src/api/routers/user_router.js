const express = require('express');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();

router.route('/')
    .get((_, res) => {
        const unqfy = getUNQfy();
        const users = unqfy.getAllUsers();

        res.status(200)
            .json(users.map(user => { return { id: user.id, username: user.username } }));
    })
    .post((req, res) => {
        const { username } = req.body;

        const unqfy = getUNQfy();
        const user = unqfy.addUser(username);
        saveUNQfy(unqfy);

        res.status(201)
            .json(user.toJSON());
    });

router.route('/:user_id')
    .delete((req, res) => {
        const user_id = req.params.user_id;

        const unqfy = getUNQfy();
        unqfy.removeUserById(user_id);
        saveUNQfy(unqfy);

        res.status(204)
            .json({});
    });

router.route('/:user_id/listenings')
    .get((req, res) => {
        const user_id = parseInt(req.params.user_id);

        const unqfy = getUNQfy();
        const user = unqfy.getUserById(user_id);

        res.status(200)
            .json(user.toJSON().tracksListened);
    });

router.route('/:user_id/listenings/track/:track_id')
    .get((req, res) => {
        const params = req.params;
        const user_id = parseInt(params.user_id);
        const track_id = parseInt(params.track_id);

        const unqfy = getUNQfy();
        const times = unqfy.timesUserListenedTrack(user_id, track_id);

        res.status(200)
            .json({ times });
    })
    .post((req, res) => {
        const params = req.params;
        const user_id = parseInt(params.user_id);
        const track_id = parseInt(params.track_id);

        const unqfy = getUNQfy();
        const user = unqfy.userListenTo(user_id, track_id);
        saveUNQfy(unqfy);

        res.status(201)
            .json(user.toJSON());
    })

router.route('/:user_id/listenings/playlist/:playlist_id')
    .post((req, res) => {
        const params = req.params;
        const user_id = parseInt(params.user_id);
        const playlist_id = parseInt(params.playlist_id);

        const unqfy = getUNQfy();
        const user = unqfy.userListenPlaylist(user_id, playlist_id);
        saveUNQfy(unqfy);

        res.status(201)
            .json(user.toJSON());
    })
module.exports = router;