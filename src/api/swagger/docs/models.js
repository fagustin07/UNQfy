
/******** ALBUM ********/

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

 *   AlbumDetails:
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
 *          $ref: '#/definitions/Track'
 *         example: []
*/