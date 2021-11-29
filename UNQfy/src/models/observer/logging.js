const Observer = require('./observer');
const loggingClient = require('../../helpers/clients/loggingClient');

class Logging extends Observer {
  update(action, data) {
    loggingClient.sendLog(action, data)
      .catch(err => {        
        if(this._existMessage(err)) {
          console.log(`Error sending log: ${err.response.data.message}`);
        } else {
          console.log(`Could not connect with Logging Service: ${err.message}`);
        }
      })
  }

  _existMessage(err) { 
    return err.response &&
    err.response.data &&
    err.response.data.message;
  }
}

module.exports = Logging;
