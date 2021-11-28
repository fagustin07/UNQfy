const Command = require("./command");

class GetTracksFrom extends Command {

    static command() {
        return 'searchByPartialName';
    }

    execute(unqfy, args) {
        const partialName = this.valueOf('--name', args);
        
        return ['SEARCH RESULT', unqfy.searchByPartialName(partialName)];
    }

    expectedArgsFormatMessage() {
        return 'searchByPartialName --name aPartialName';
    }

    expectedArgs() {
        return ['--name'];
    }

}

module.exports = GetTracksFrom;