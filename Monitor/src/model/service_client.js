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
                    return this._sendHeartbeatHasChanged();
                } else {
                    return this._sendNoChanges();
                }
            })
            .catch((_) => {
                if (this.heartbeat) {
                    this.heartbeat = false;
                    return this._sendHeartbeatHasChanged();
                } else {
                    return this._sendNoChanges();
                }
            });
    }

    livenessStatus() {
        return {
            service: this.name,
            status: this.heartbeat ? 'on' : 'off'
        }
    }

    _sendHeartbeatHasChanged() {
        return this._generateReport(
            true, 
            this.name + ' service ' + this._statusChanged());
    }

    _sendNoChanges() {
        return this._generateReport(false, null);
    }

    _generateReport(isHeartbeatChanged, reportMessage) {
        return {
            isHeartbeatChanged,
            reportMessage
        };
    }

    _statusChanged() {
        return this.heartbeat ? 'is working again' : 'has stopped working';
    }

    _heartbeatEndpoint() {
        return '/api/heartbeat';
    }
}

module.exports = ServiceClient;