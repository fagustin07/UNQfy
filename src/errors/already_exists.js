const { ResourceAlreadyExists } = require('./basics');

class ArtistAlreadyExists extends ResourceAlreadyExists {
    constructor(){
        super('Artist');
    }
}

class AlbumAlreadyExists extends ResourceAlreadyExists {
    constructor(){
        super('Album');
    }
}

class TrackAlreadyExists extends ResourceAlreadyExists {
    constructor(){
        super('Track');
    }
}

class PlaylistAlreadyExists extends ResourceAlreadyExists {
    constructor(){
        super('Playlist');
    }
}

class UserAlreadyExists extends ResourceAlreadyExists {
    constructor(){
        super('User');
    }
}

module.exports = {
    ArtistAlreadyExists,
    AlbumAlreadyExists,
    TrackAlreadyExists,
    PlaylistAlreadyExists,
    UserAlreadyExists
}