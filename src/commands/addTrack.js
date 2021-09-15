const Command = require("./command");

class AddTrack extends Command {
    static command() {
        return 'addTrack';
    }

    makeBeuty(element){
        return '== NEW TRACK === \n' + super.makeBeuty(element);
    }

    execute(unqfy,args){
        const albumId = parseInt(this.valueOf('--albumId', args));
        const name = this.valueOf('--name', args);
        const duration = parseInt(this.valueOf('--duration', args));
        const genres = this.valueOf('--genres', args).split(',').map(genre => genre.trim())

        try {
            return unqfy.addTrack(albumId, { name, duration, genres});
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    
    }
}

module.exports = AddTrack;