class Observer {
    update(action, data) {
        throw new Error('Subclass responsability');
    }
}

module.exports = Observer;
