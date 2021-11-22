const fs = require('fs');
const { google } = require('googleapis');

const CREDENTIALS_PATH = './credentials.json';
const TOKEN_PATH = './token.json';

class GmailClient {

    constructor() {
        if (!fs.existsSync(CREDENTIALS_PATH)) {
            throw new Error(`Credentials file not found: ${CREDENTIALS_PATH}`);
        }
        if (!fs.existsSync(TOKEN_PATH)) {
            throw new Error(`Token file not found: ${TOKEN_PATH}`);
        }

        this.credentials_file = CREDENTIALS_PATH;
        this.token_file = TOKEN_PATH;
        this._client = this._buildGmailClient();
    }

    sendMails(receivers, subject, body) {
        receivers.forEach((receiver) => {
            this._client.users.messages.send(
                {
                    userId: 'me',
                    requestBody: {
                        raw: this._createMessage(subject, body, receiver),
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


    _buildGmailClient() {
        const credentials = fs.readFileSync(this.credentials_file);
        const token = fs.readFileSync(this.token_file)
        const oauthClient = this._buildOAuthClient(this._makeCredentials(credentials, token));

        return google.gmail({ version: 'v1', auth: oauthClient });
    }

    _makeCredentials(credentials, token) {
        return {
            params: JSON.parse(credentials).installed,
            token: JSON.parse(token),
        };
    }

    _buildOAuthClient(credentials) {
        const oAuth2Client = new google.auth.OAuth2(
            credentials.params.client_id,
            credentials.params.client_secret,
            credentials.params.redirect_uris[0]
        );
        oAuth2Client.setCredentials(credentials.token);
        return oAuth2Client;
    }
}

module.exports = GmailClient;
