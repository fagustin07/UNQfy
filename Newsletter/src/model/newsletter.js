const { EmailAlreadyRegistered } = require('./errors');

class NotifyService {
    constructor() {
        this.subscribers = {};
    }

    subscribe(artistId, email) {
        const subscribers = this.subscribers[artistId];
        if (subscribers) {
            if (this.alreadyRegistered(subscribers, email)) throw new EmailAlreadyRegistered();
            subscribers.push(email);
        } else {
            this.subscribers[artistId] = [email];
        }
    }

    unsubscribe(artistId, email) {
        const subscribers = this.getSubscribersForArtistId(artistId);
        if (subscribers) {
            this.subscribers[artistId] = subscribers.filter(mail => mail !== email);
        }
    }

    alreadyRegistered(subscribers, email) {
        return subscribers.some((email_registered) => email_registered === email);
    }

    getSubscribersForArtistId(artistId) {
        return this.subscribers[artistId] || [];
    }

    deleteSubscribersOfArtistId(artistId) {
        delete this.subscribers[artistId];
    }

    notify(artistId, subject, message) {
        const subscribers = this.subscribers[artistId] || [];
        return this._notifySubscribers(subscribers, subject, message);
    }

    _notifySubscribers(subscribers, subject, message) {
        return subscribers.map((suscr) => console.log({subject: subject, message: message, suscr: suscr}));
    }

}

const singleton = new NotifyService();
module.exports = singleton;
