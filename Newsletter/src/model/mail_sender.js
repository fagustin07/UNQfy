const buildGmailClient = require('../helpers/clients/gmail_client')

class MailSender {
    constructor() {
        this._client = buildGmailClient();
    }

    sendMailsToUsers(users, subject, message) {
        users.forEach((user) => {
            this._client.users.messages.send(
                {
                    userId: 'me',
                    requestBody: {
                        raw: this._createMessage(subject, message, user),
                    },
                }
            );
        });
    }

    _createMessage(subject, bodyLines, receiver) {
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        let messageParts = [
            `From: UNQfy Team <unqfy.noreply@gmail.com>`,
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
}

module.exports = MailSender;