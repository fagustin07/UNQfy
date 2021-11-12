const ObserverManager = require("./observerManager");

class Observable {
    constructor() {
      this._observerManager = new ObserverManager();
    }
  
    addObserver(observer, actions) {
      this._observerManager.addObserver(observer, actions);
    }
  
    _notify(action, data) {
      this._observerManager._notify(action, data);
    }
  }
  
  module.exports = Observable;
