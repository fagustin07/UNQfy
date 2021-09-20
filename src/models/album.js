const Adder = require("./adder");

class Album extends Adder {

    constructor(name, year) {
        super(name);
        this.year = year;
    }

    createTrack(aTrack){
        this.addElement(aTrack);
    }

    removeTrack(aTrack) {
        this.removeElement(aTrack);
    }

    hasTrack(track) {
        return this.belongsElement(track);
    }

    takeTrack(id) {
        return this.takeElement(id);
    }

    tracks() {
        return this.elements();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            year: this.year,
            tracks: this.tracks().map(track => track.toJSON()),
        }
    }
}

module.exports = Album;