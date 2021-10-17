const Command = require("./command");

class GetLyrics extends Command {

    static command() {
        return 'getLyrics';
    }

    async execute(unqfy,args){
        const trackId = parseInt(this.valueOf('--trackId', args));

        const lyrics = await unqfy.getLyrics(trackId);        
        return ['TRACK LYRICS', lyrics];
    }

    expectedArgsFormatMessage() {
        return 'getLyrics --trackId trackId';
    }

    expectedArgs() {
        return ['--trackId'];
    }
}

module.exports = GetLyrics;