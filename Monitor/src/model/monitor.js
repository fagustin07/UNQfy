const { UNQFY_API_HOST, LOGGING_API_HOST, NEWSLETTER_API_HOST, DISCORD_WEBHOOK } = process.env;
const { default: axios } = require('axios');
const Service = require('../model/service_enum');
const ServiceClient = require("./service_client");

class Monitor {
  constructor() {
    this._interval = 4500;
    this._active = true;
    this._timer = null;
    this._services = [
      new ServiceClient(Service.UNQfy, UNQFY_API_HOST),
      new ServiceClient(Service.Logging, LOGGING_API_HOST),
      new ServiceClient(Service.Newsletter, NEWSLETTER_API_HOST)
    ];
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

  _checkHeartbeats(){
    this._services.forEach((service) => {
      service.checkHeartbeat()
        .then(heartbeatReport => {
          if(heartbeatReport !== null) this._doReport(service, heartbeatReport);
        })
        .catch( _ => console.log(`Cannot detect last ${service.name} service hearbeat.`))
    });
  }

  _activate() {
    this._timer = setInterval(()=> this._checkHeartbeats(), this._interval);
  }

  _desactivate() {
    clearInterval(this._timer);
  }

  _doReport(service, heartbeatReport) {
    const report = this._generateReport(service, heartbeatReport);
    console.log(report);
    axios.post(DISCORD_WEBHOOK, { content: report })
     .then(_ => {
       console.log(`${service.name} heartbeat report has been sent successfully.`)
     })
     .catch (err => console.log(`Failed to send ${service.name} service report. Problem: ${err.message}`));
  }

  _generateReport(service, heartbeatReport) {
    return `[${this._timeReport()}] ${service.name} service ${heartbeatReport}.`;
  }

  _timeReport() {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }
}

const monitorInstance = new Monitor(); 
module.exports = monitorInstance;
