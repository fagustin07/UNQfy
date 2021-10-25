/**
 * @swagger
 * /playlist:
 *   get:
 *     summary: Returns playlist with given name, durationLG and duration GT
 *     tags:
 *       - Playlist
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *            type: string
 *            example: Bon Jovi
 *         description: name from an desired playlist
 *       - in: query
 *         name: durationLG
 *         schema:
 *            type: number
 *            example: 300
 *         description: duration less than total duration from desired playlist
 *       - in: query
 *         name: durationGT
 *         schema:
 *           type: number
 *           example: 100
 *         description: duration greater than total duration from desired playlist   
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Playlist'
 *       500:
 *         description: INTERNAL_SERVER_ERROR
 *   post:
 *     summary: Create a playlist by max duration
 *     tags:
 *       - Playlist
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: playlist request
 *         schema:
 *           $ref: '#/definitions/PlaylistMaxDurationRequest'
 *     responses:
 *       201:
 *         description: CREATED
 *         schema:
 *            $ref: '#/definitions/NewPlaylist'
 *       400:
 *         description: BAD_REQUEST
 *       404:
 *         description: RELATED_RESOURCE_NOT_FOUND
 *       409:
 *         description: RESOURCE_ALREADY_EXISTS
 *       500:
 *         description: INTERNAL_SERVER_ERROR
 */
