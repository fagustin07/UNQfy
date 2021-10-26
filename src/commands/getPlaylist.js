const Command = require("./command");

class GetPlaylist extends Command {
    static command() {
        return 'getPlaylist';
    }

    execute(unqfy,args){
        const id = parseInt(this.valueOf('--id', args));

        return ['PLAYLIST FOUND', unqfy.getPlaylistById(id)];
    }

    expectedArgsFormatMessage() {
        return 'getPlaylist --id playlistId';
    }

    isADetailsCommand() {
        return true;
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = GetPlaylist;