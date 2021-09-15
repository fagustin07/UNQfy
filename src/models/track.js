const _idGenerator = require('../lib/IDGenerator');

class Track {
    constructor(name, duration, genres){
        this.id = _idGenerator.newId();
        this.name = name;
        this.duration = duration;
        this.genres = genres;
    }
}

module.exports = Track;