const { EmailAlreadyRegistered } = require('./errors');
const picklify = require('picklify');
const fs = require('fs');
const mailSender = require('./mail_sender')

class Newsletter {
    constructor() {
        this.subscribers = {};
    }

    setGmailClient(gmailClient) {
        this.client = gmailClient;
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
        if (subscribers) {
            subscribers.forEach((subscriber) => {
                mailSender.sendMail(subscriber, subject, message);
            })
        }
    }

    static load(filename) {
        const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        const classes = [Newsletter];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    }

    save(filename) {
        const serializedData = picklify.picklify(this);
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    }

}

module.exports = {
    Newsletter: Newsletter,
    newsletter: new Newsletter()
};
