const { default: axios } = require("axios");

class Monitor {
  constructor() {
    this._interval = 3000;
    this._active = true;
    this._timer = null;
    this._servicesHeartbeats = {
        'UNQfy' : true
    };
    this._activate();
  }

  change() {
    this._active = !this._active;
    this._active ? this._activate() : this._desactivate();
    console.log(`Monitor has been turned ${this._active ? 'on' : 'off'}.`);
    return this._active;
  }

  heartbeats() {
    return this._servicesHeartbeats;
  }

  _check(){
    axios.get('http://localhost:8081' + '/api/heartbeat')
        .then(_ => {
            if(!this._servicesHeartbeats.UNQfy) {
                console.log(new Date() + ' ' + 'UNQfy service is working again.' );
                this._servicesHeartbeats.UNQfy = true;
            }
        })
        .catch(_ => {
            if(this._servicesHeartbeats.UNQfy) {
                console.log(new Date() + ' ' + 'UNQfy service has stopped working.' );
                this._servicesHeartbeats.UNQfy = false;
            }
        });
  }

  _activate() {
    this._timer = setInterval(()=> this._check(), this._interval);
  }

  _desactivate() {
    clearInterval(this._timer);
  }
}

const monitorInstance = new Monitor(); 
module.exports = monitorInstance;
