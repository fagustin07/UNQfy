const { ResourceNotFound, RelatedResourceNotFound } = require('./basics');

class ArtistNotFound extends ResourceNotFound {
    constructor(){
        super('Artist');
    }
}

class ArtistNamedNotFound extends ResourceNotFound {
    constructor(artistName){
        super('Artist ' + artistName);
    }
}

class AlbumNotFound extends ResourceNotFound {
    constructor(){
        super('Album');
    }
}

class TrackNotFound extends ResourceNotFound {
    constructor(){
        super('Track');
    }
}

class PlaylistNotFound extends ResourceNotFound {
    constructor(){
        super('Playlist');
    }
}

class UserNotFound extends ResourceNotFound {
    constructor(){
        super('User');
    }
}

class LyricsNotFound extends ResourceNotFound{
    constructor(){
        super('Lyrics');
    }
}

class RelatedArtistNotFound extends RelatedResourceNotFound{
    constructor(){
        super('artist');
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
    RelatedArtistNotFound,
}