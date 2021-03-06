const discordClient = require('./discordClient');
const basicServices = require('./basicServices');

class Monitor {
  constructor(services = basicServices) {
    this._interval = 3000;
    this._active = true;
    this._timer = null;
    this._services = services;
    this._activate();
  }

  change() {
    this._active = !this._active;
    this._active ? this._activate() : this._desactivate();
    console.log(`Monitor has been turned ${this._active ? 'on' : 'off'}.`);
    return this._active;
  }

  heartbeats() {
    return this._services.map((service) => service.livenessStatus());
  }

  _checkHeartbeats() {
    this._services.forEach((service) => {
      service.checkHeartbeat()
        .then((heartbeatReport) => {
          const { isHeartbeatChanged, reportMessage } = heartbeatReport;
          if (isHeartbeatChanged) {
            this._doReport(service, reportMessage);
          }
        })
        .catch(_ => console.log(`Cannot detect last ${service.name} service hearbeat.`))
    });
  }

  _activate() {
    this._timer = setInterval(() => this._checkHeartbeats(), this._interval);
  }

  _desactivate() {
    clearInterval(this._timer);
  }

  _doReport(service, reportMessage) {
    const report = this._generateReport(reportMessage);
    console.log(report);
    this._sendReportToDiscord(service, report);
  }

  _sendReportToDiscord(service, report) {
    discordClient.sendNotify(report)
      .then(_ =>
        console.log(`${service.name} heartbeat report has been sent successfully.`)
      )
      .catch(err =>
        console.log(`Failed to send ${service.name} service report. Problem: ${err.message}`)
      );
  }

  _generateReport(reportMessage) {
    return `[${this._timeReport()}] ${reportMessage}.`;
  }

  _timeReport() {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }
}

const monitorInstance = new Monitor();
module.exports = monitorInstance;
