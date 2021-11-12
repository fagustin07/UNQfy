const Command = require("./command");

class Listen extends Command{
    static command() {
        return 'listen';
    }

    execute(unqfy,args){
        const userId = parseInt(this.valueOf('--userId', args));
        const trackId = parseInt(this.valueOf('--trackId', args));

        return ['TRACK LISTEN', unqfy.userListenTo(userId,trackId)];
    }

    expectedArgsFormatMessage() {
        return 'listen --userId userId --trackId trackId';
    }

    expectedArgs() {
        return ['--userId', '--trackId'];
    }
}

module.exports = Listen;