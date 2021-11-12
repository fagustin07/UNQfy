const Action = require("./action");

class ObserverManager {
    constructor() {
      this._observers = {};
      Object.keys(Action).forEach(action => this._observers[action] = []);
    }

    addObserver(observer, actions) {
        actions.forEach(action => this._observers[action].push(observer));
    }

    _notify(action, data) {
        this._observers[action].forEach(observer => observer.update(action, data));
    }
}

  module.exports = ObserverManager;
  