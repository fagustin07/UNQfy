const { AlbumAlreadyExists, TrackAlreadyExists, PlaylistAlreadyExists, UserAlreadyExists, ArtistAlreadyExists, RelatedTrackNotFound, RelatedArtistNotFound, ArtistNamedNotFound, AlbumNotFound, TrackNotFound, PlaylistNotFound, UserNotFound, LyricsNotFound, ArtistNotFound } = require('../errors/model_errors');
const { ResourceNotFound, ResourceAlreadyExists, RelatedResourceNotFound } = require('../errors/api_errors.js');

function model_error_handler(err, req, res, next) {
    switch(true) {
        case (isAlreadyExists(err)):
            next(new ResourceAlreadyExists(), req, res, next);
            break;
        case (isResourceNotFound(err)):
            next(new ResourceNotFound(), req, res, next);
            break;
        case (isRelatedResourceNotFound(err)):
            next(new RelatedResourceNotFound(), req, res, next);
            break;        
        default:
            next(err, req, res, next);
            break;
    }
}

function isRelatedResourceNotFound(err) {
    return err instanceof RelatedTrackNotFound || err instanceof RelatedArtistNotFound;
}

function isResourceNotFound(err) {
    return err instanceof ArtistNotFound || err instanceof ArtistNamedNotFound ||
    err instanceof AlbumNotFound || err instanceof TrackNotFound || 
    err instanceof PlaylistNotFound || err instanceof UserNotFound || LyricsNotFound; 
}

function isAlreadyExists(err) {
    return err instanceof ArtistAlreadyExists || err instanceof AlbumAlreadyExists ||  
    err instanceof TrackAlreadyExists || err instanceof PlaylistAlreadyExists ||  
    err instanceof UserAlreadyExists; 
}

module.exports = model_error_handler;