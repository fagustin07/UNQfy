const Recognizable = require('./recognizable');

class Adder extends Recognizable {

    constructor(aName){
        super(aName);
        this._myElements = {};
    }

    addElement(aRecognizable){
        this._myElements[aRecognizable.id] = aRecognizable;
    }

    belongsElement(aRecognizable){
        return this._myElements[aRecognizable.id] !== undefined;
    }

    takeElement(id) {
        return this._myElements[id];
    }

    removeElement(aRecognizable){
        delete this._myElements[aRecognizable.id];
    }

    elements() {
        return Object.values(this._myElements);
    }
}

module.exports = Adder;