const Command = require("./command");

class RemovePlaylist extends Command {

    static command() {
        return 'removePlaylist';
    }

    execute(unqfy,args){
        const playlistId = parseInt(this.valueOf('--id', args));

        return ['PLAYLIST REMOVED', unqfy.removePlaylistById(playlistId)];
    }
}

module.exports = RemovePlaylist;