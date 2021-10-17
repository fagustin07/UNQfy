const Command = require("./command");

class GetLyrics extends Command {

    static command() {
        return 'getLyrics';
    }

    async execute(unqfy,args){
        const trackName = this.valueOf('--trackName', args)

        const lyrics = await unqfy.getLyrics(trackName);        
        return ['TRACK LYRICS', lyrics];
    }

    expectedArgsFormatMessage() {
        return 'getLyrics --trackName trackName';
    }

    expectedArgs() {
        return ['--trackName'];
    }
}

module.exports = GetLyrics;