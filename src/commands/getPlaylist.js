const Command = require("./command");

class GetPlaylist extends Command {
    static command() {
        return 'getPlaylist';
    }

    execute(unqfy,args){
        const id = parseInt(this.valueOf('--id', args));

        return ['FOUND PLAYLIST', unqfy.getPlaylistById(id)];
    }
}

module.exports = GetPlaylist;