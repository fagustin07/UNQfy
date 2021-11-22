const { EmailAlreadyRegistered } = require('./errors');
const picklify = require('picklify');
const fs = require('fs');
const GmailClient = require('../helpers/clients/gmail_client');

class NotifyService {
    constructor() {
        this.subscribers = {};
        this.client = new GmailClient();
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
        console.log(`Deleted subscriptions from artistId ${artistId}`);
    }

    notify(artistId, subject, message) {
        const subscribers = this.subscribers[artistId];
        if(subscribers) {
            this._notifySubscribers(subscribers, subject, message);
        }
    }

    _notifySubscribers(subscribers, subject, message) {
        this.client.sendMails(subscribers, subject, message);
    }

    _createMessage(subject, bodyLines, receiver) {
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        let messageParts = [
            `From: Unqfy <unqfy30@gmail.com>`,
            `To: ${receiver}`,
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            bodyLines
        ];
        const message = messageParts.join('\n');

        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        return encodedMessage;
    }

    static load(filename) {
        const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        const classes = [NotifyService, GmailClient];
        
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }

    save(filename) {
        const serializedData = picklify.picklify(this);
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
      }
}

module.exports = {
    NotifyService: NotifyService,
    newsletter: new NotifyService()
};
