const Command = require("./command");

class GetTrack extends Command {

    static command() {
        return 'getTrack';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['FOUND TRACK', unqfy.getTrackById(id)];
    }

}

module.exports = GetTrack;