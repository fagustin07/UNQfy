const Command = require("./command");

class GetPlaylist extends Command {
    static command() {
        return 'getPlaylist';
    }

    makeBeuty(element){
        return '== FOUNDED PLAYLIST === \n' + super.makeBeuty(element);
    }

    execute(unqfy,args){
        const id = parseInt(this.valueOf('--id', args));

        try {
            return unqfy.getPlaylistById(id);
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    }
}

module.exports = GetPlaylist;