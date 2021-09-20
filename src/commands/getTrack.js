const Command = require("./command");

class GetTrack extends Command {

    static command() {
        return 'getTrack';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['TRACK FOUND', unqfy.getTrackById(id)];
    }
    
    expectedArgsFormatMessage() {
        return 'getTrack --id trackId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = GetTrack;