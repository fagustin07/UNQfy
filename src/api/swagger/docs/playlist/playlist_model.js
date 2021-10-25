/******** PLAYLIST ********/

/**
 * @swagger
 * definitions:
 *   Playlist:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 28
 *       name:
 *         type: string
 *         example: Insomnio
 *       duration:
 *         type: number
 *         example: 3000
 *       genres:
 *         type: array
 *         items: string
 *         example: ["rock", "pop"]
 *       tracks:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Track'
 *         example: []
 *
 *   PlaylistMaxDurationRequest:
 *        type: object
 *        properties:
 *            name:
 *              type: string
 *              example: "My awesome playlist"
 *            maxDuration:
 *               type: number
 *               example: 5000
 *            genres:
 *                type: array
 *                items: string
 *                example: ["rock"]
 *
 *   NewPlaylist:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  example: 9999
 *              name:
 *                  type: string
 *                  example: Playlist name
 *              duration:
 *                  type: number
 *                  example: 5000
 *              tracks:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Track'
 *                  example: []
 *
 */