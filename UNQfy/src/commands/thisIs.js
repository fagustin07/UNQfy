const Command = require("./command");

class ThisIs extends Command{
    static command() {
        return 'thisIs';
    }

    execute(unqfy,args){
        const artistId = parseInt(this.valueOf('--artistId', args));

        return ['THIS IS...', unqfy.thisIs(artistId)];
    }

    expectedArgsFormatMessage() {
        return 'thisIs --artistId artistId';
    }

    expectedArgs() {
        return ['--artistId'];
    }
}

module.exports = ThisIs;