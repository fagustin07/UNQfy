const express = require('express');
const { BadRequest } = require('../../errors/basics');
const { getUNQfy, saveUNQfy } = require('../../lib/UNQfyPersistence');
const router = express.Router();

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Returns albums with given name
 *     tags:
 *       - Albums
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: Mi VId
 *         description: partial name from an desired album 
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Album'
 *       500:
 *         description: INTERNAL_SERVER_ERROR
 *   post:
 *     summary: Create an album
 *     tags:
 *       - Albums
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: album request
 *         schema:
 *           $ref: '#/definitions/AlbumRequest'
 *     responses:
 *       201:
 *         description: CREATED
 *         schema:
 *            $ref: '#/definitions/NewAlbum'
 *       400:
 *         description: BAD_REQUEST
 *       404:
 *         description: RELATED_RESOURCE_NOT_FOUND
 *       409:
 *         description: RESOURCE_ALREADY_EXISTS
 *       500:
 *         description: INTERNAL_SERVER_ERROR 
 */
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
            .json(album.toJSON());
    });

/**
 * @swagger
 * /albums/{albumId}:
 *   get:
 *     summary: Return album with given albumId
 *     tags:
 *       - Albums
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: albumId
 *         schema:
 *           type: number
 *           example: 5
 *         description: id from an album 
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *            $ref: '#/definitions/Album'
 *       400:
 *         description: BAD_REQUEST
 *       404:
 *         description: RESOURCE_NOT_FOUND
 *       500:
 *         description: INTERNAL_SERVER_ERROR
 *   patch:
 *     summary: Update an album
 *     tags:
 *       - Albums
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: albumId
 *         schema:
 *           type: number
 *           example: 5
 *         description: id from an album
 *       - in: body
 *         name: update album data
 *         schema:
 *           $ref: '#/definitions/AlbumUpdateRequest'
 *     responses:
 *       200:
 *         description: UPDATED
 *         schema:
 *            $ref: '#/definitions/Album'
 *       400:
 *         description: BAD_REQUEST
 *       404:
 *         description: RESOURCE_NOT_FOUND
 *       500:
 *         description: INTERNAL_SERVER_ERROR
 *   delete:
 *     summary: Delete an album
 *     tags:
 *       - Albums
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: albumId
 *         schema:
 *           type: number
 *           example: 5
 *     responses:
 *       204:
 *         description: DELETED
 *       400:
 *         description: BAD_REQUEST
 *       404:
 *         description: RESOURCE_NOT_FOUND
 *       500:
 *         description: INTERNAL_SERVER_ERROR 
 */
router.route('/:albumId')
    .get((req, res) => {
        const albumId = parseInt(req.params.albumId);
        if(!albumId) throw new BadRequest();

        const unqfy = getUNQfy();
        const anAlbum = unqfy.getAlbumById(albumId);

        res.status(200)
            .json(anAlbum.toJSON());
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

/**
 * @swagger
 * definitions:
 *   Album:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 10
 *       name:
 *         type: string
 *         example: mi vida
 *       year:
 *         type: number
 *         example: 2006
 *       tracks:
 *         type: array
 *         items:
 *          $ref: '#/definitions/Track'
 * 
 *   AlbumRequest:
 *     type: object
 *     properties:
 *       artistId:
 *         type: number
 *         example: 4
 *       name:
 *         type: string
 *         example: album_example
 *       year:
 *         type: number
 *         example: 2020
 * 
 *   AlbumUpdateRequest:
 *     type: object
 *     properties:
 *       year:
 *         type: number
 *         example: 1999
 * 
 *   NewAlbum:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 9999
 *       name:
 *         type: string
 *         example: nuevo AlBum
 *       year:
 *         type: number
 *         example: 2020
 *       tracks:
 *         type: array
 *         items:
 *          type: Album
 *          example: []
*/

module.exports = router;