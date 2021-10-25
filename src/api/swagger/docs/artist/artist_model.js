/******** ARTIST ********/

/**
 * @swagger
 * definitions:
 *    Artist:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 2
 *       name:
 *         type: string
 *         example: Queen
 *       country:
 *         type: string
 *         example: USA
 *
 *    ArtistRequest:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: "Charly Garcia"
 *       country:
 *         type: string
 *         example: "ARG"
 *
 *    NewArtist:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 9999
 *       name:
 *         type: string
 *         example: Charly Garcia
 *       country:
 *         type: string
 *         example: ARG
 *       albums:
 *         type: array
 *         items:
 *          $ref: '#/definitions/AlbumDetails'
 *         example: []
 *
 *    ArtistDetails:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *         example: 10
 *       name:
 *         type: string
 *         example: Charly Garcia
 *       country:
 *         type: string
 *         example: ARG
 *       albums:
 *         type: array
 *         items:
 *          $ref: '#/definitions/AlbumDetails'
 *
 *    ArtistUpdateRequest:
 *     type: object
 *     properties:
 *       name:
 *          type: string
 *          example: Charly Garcia
 *       country:
 *         type: string
 *         example: ARG
 *
 */