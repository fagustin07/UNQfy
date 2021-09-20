const Command = require("./command");

class RemoveTrack extends Command {

    static command() {
        return 'removeTrack';
    }

    execute(unqfy,args){
        const trackId = parseInt(this.valueOf('--id', args));

        return ['TRACK REMOVED', unqfy.removeTrackById(trackId)];
    }

    expectedArgsFormatMessage() {
        return 'removeTrack --id trackId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = RemoveTrack;