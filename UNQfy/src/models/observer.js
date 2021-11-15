class Observer {
    constructor(baseURL) {
        this._baseURL = baseURL;
    }

    update(action, data) {
        throw new Error('Subclass responsability');
    }
}

module.exports = Observer;
