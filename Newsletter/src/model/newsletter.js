const { EmailAlreadyRegistered } = require('./errors');
const picklify = require('picklify');
const fs = require('fs');
const MailSender = require('./mail_sender')

class NotifyService {
    constructor() {
        this.subscribers = {};
        this.mailSender = new MailSender();
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
            this.mailSender.sendMailsToUsers(subscribers, subject, message);
        }
    }

    static load() {
        if (fs.existsSync('data.json')) {
            const serializedData = fs.readFileSync('data.json', { encoding: 'utf-8' });
            const classes = [NotifyService, MailSender];
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
    NotifyService: NotifyService,
    newsletter: new NotifyService()
};
