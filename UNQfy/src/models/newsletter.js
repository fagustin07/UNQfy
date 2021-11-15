const axios = require('axios');
const Observer = require('./observer');
const Action = require('./action');

class Newsletter extends Observer {
    constructor() {
        super(process.env.NEWSLETTER_API_HOST);
    }

    update(action, data) {
        if (action === Action.addAlbum) {
            this._notifyAlbum(data);
        } else {
            this._notifyDeleteArtist(data);
        }
    }

    _notifyAlbum(album) {
        axios.post(this._baseURL + '/api/notify', {
            artistId: album.artist.id,
            subject: `New album from ${album.artistName()}`,
            message: `One of your subscribed artists, ${album.artistName()} released a new album called ${album.name}.\nRegards\n- UNQfy Team.`
        })
        .then(_ => {
            console.log(`[NEWSLETTER] ${Action.addAlbum} from ${album.artistName()}.`)
        })
        .catch(err => {
            console.log(`Could not connect with Newsletter Service: ${err.message}`);
        })
    }

    _notifyDeleteArtist(artist) {
        axios.delete(this._baseURL + '/api/subscriptions', { data: { artistId: artist.id } })
        .then(_ => {
            console.log(`[NEWSLETTER] ${Action.deleteArtist}: ${artist.name}.`)
        })
        .catch(err => {
            console.log(`Could not connect with Newsletter Service: ${err.message}`);
        })
    }
}

module.exports = Newsletter;
