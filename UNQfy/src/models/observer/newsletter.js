const Observer = require('./observer');
const Action = require('./action');
const newsletterClient = require('../../helpers/clients/newsletterClient');

class Newsletter extends Observer {
    update(action, data) {
        if (action === Action.addAlbum) {
            this._notifyNewAlbum(data);
        } else {
            this._notifyDeleteArtist(data);
        }
    }

    _notifyNewAlbum(album) {
        newsletterClient.notifyNewAlbum(album)
            .catch(err => {
                console.log(`Could not connect with Newsletter Service: ${err.message}`);
            });
    }

    _notifyDeleteArtist(artist) {
        newsletterClient.notifyDeleteArtist(artist)
            .catch(err => {
                console.log(`Could not connect with Newsletter Service: ${err.message}`);
            });
    }
}

module.exports = Newsletter;
