const Command = require("./Command");

class AddTrack extends Command {
    static command() {
        return 'addTrack';
    }

    execute(unqfy,args){
        const albumId = parseInt(this.valueOf('--albumId', args));
        const name = this.valueOf('--name', args);
        const duration = parseInt(this.valueOf('--duration', args));
        const genres = this.valueOf('--genres', args).split(',').map(genre => genre.trim())

        return ['ADDED TRACK', unqfy.addTrack(albumId, { name, duration, genres})];
    }
}

module.exports = AddTrack;