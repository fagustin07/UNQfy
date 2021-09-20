const _idGenerator = require('../lib/IDGenerator');

class Recognizable {
    constructor(name) {
        this.id = _idGenerator.newId(); 
        this.name = name;
    }
}

module.exports = Recognizable;