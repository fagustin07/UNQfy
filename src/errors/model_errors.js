const { UNQfyError } = require('./abstract_errors');

class ArtistNotFound extends UNQfyError {
    constructor(){
        super('Artist not found');
    }
}

class ArtistNamedNotFound extends UNQfyError {
    constructor(artistName){
        super('Artist ' + artistName + ' not found');
    }
}

class AlbumNotFound extends UNQfyError {
    constructor(){
        super('Album not found');
    }
}

class TrackNotFound extends UNQfyError {
    constructor(){
        super('Track not found');
    }
}

class PlaylistNotFound extends UNQfyError {
    constructor(){
        super('Playlist not found');
    }
}

class UserNotFound extends UNQfyError {
    constructor(){
        super('User not found');
    }
}

class LyricsNotFound extends UNQfyError {
    constructor(){
        super('Lyrics not found');
    }
}

class RelatedArtistNotFound extends UNQfyError {
    constructor(){
        super('Related artist not found');
    }
}

class RelatedTrackNotFound extends UNQfyError {
    constructor(){
        super('Related track not found');
    }
}

class ArtistAlreadyExists extends UNQfyError {
    constructor(){
        super('Artist already exists');
    }
}

class AlbumAlreadyExists extends UNQfyError {
    constructor(){
        super('Album already exists');
    }
}

class TrackAlreadyExists extends UNQfyError {
    constructor(){
        super('Track already exists');
    }
}

class PlaylistAlreadyExists extends UNQfyError {
    constructor(){
        super('Playlist already exists');
    }
}

class UserAlreadyExists extends UNQfyError {
    constructor(){
        super('User already exists');
    }
}

module.exports = {
    ArtistNotFound,
    AlbumNotFound,
    TrackNotFound,
    PlaylistNotFound,
    UserNotFound,
    LyricsNotFound,
    ArtistNamedNotFound,
    RelatedTrackNotFound,
    RelatedArtistNotFound,
    ArtistAlreadyExists,
    AlbumAlreadyExists,
    TrackAlreadyExists,
    PlaylistAlreadyExists,
    UserAlreadyExists
}