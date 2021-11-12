const { UNQFY_HOST, LOGGING_HOST, NEWSLETTER_HOST } = process.env;
const Service = require('../model/service_enum');
const ServiceClient = require("./service_client");

class Monitor {
  constructor() {
    this._interval = 3000;
    this._active = true;
    this._timer = null;
    this._services = [
      new ServiceClient(Service.UNQfy, UNQFY_HOST),
      new ServiceClient(Service.Logging, LOGGING_HOST),
      new ServiceClient(Service.Newsletter, NEWSLETTER_HOST)
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
          if(heartbeatReport !== null) {
            console.log(this._getReport(service, heartbeatReport));
          }
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

  _getReport(service, heartbeatReport) {
    return `[${this._timeReport()}] ${service.name} service ${heartbeatReport}.`;
  }

  _timeReport() {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }
}

const monitorInstance = new Monitor(); 
module.exports = monitorInstance;
