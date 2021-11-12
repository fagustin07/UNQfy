const { EmailAlreadyRegistered } = require('./errors');
const picklify = require('picklify');
const fs = require('fs');

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
        return subscribers.map((suscr) => console.log({ subject: subject, message: message, suscr: suscr }));
    }

    static load() {
        if (fs.existsSync('data.json')) {
            const serializedData = fs.readFileSync('data.json', { encoding: 'utf-8' });
            const classes = [NotifyService];
            const notifyService = picklify.unpicklify(JSON.parse(serializedData), classes);
            return notifyService;
        }
        return new NotifyService();
    }

    save() {
        const serializedData = picklify.picklify(this);
        fs.writeFileSync('data.json', JSON.stringify(serializedData, null, 2));
    }

}

module.exports = {
    NotifyService: NotifyService
};