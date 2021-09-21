const Command = require("./command");

class TimesUserListenedTrack extends Command{
    static command() {
        return 'timesUserListenTrack';
    }

    execute(unqfy,args){
        const userId = parseInt(this.valueOf('--userId', args));
        const trackId = parseInt(this.valueOf('--trackId', args));

        return ['TIMES LISTENED', unqfy.timesUserListenedTrack(userId,trackId)];
    }

    expectedArgsFormatMessage() {
        return 'timesUserListenTrack --userId userId --trackId trackId';
    }

    expectedArgs() {
        return ['--userId', '--trackId'];
    }
}

module.exports = TimesUserListenedTrack;