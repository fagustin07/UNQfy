const axios = require('axios');

class ServiceClient {
    constructor(name, host) {
        this.name = name;
        this.host = host;
        this.heartbeat = false;
    }

    checkHeartbeat() {
        return axios.get(this.host + this._heartbeatEndpoint())
            .then((_) => {
                if (!this.heartbeat) {
                    this.heartbeat = true;
                    return 'is working again';
                } else {
                    return null;
                }
            })
            .catch((_) => {
                if (this.heartbeat) {
                    this.heartbeat = false;
                    return 'has stopped working';
                } else {
                    return null;
                }
            });
    }

    livenessStatus() {
        return {
            service: this.name,
            status: this.heartbeat ? 'on' : 'off'
        }
    }

    _heartbeatEndpoint() {
        return '/api/heartbeat';
    }
}

module.exports = ServiceClient;