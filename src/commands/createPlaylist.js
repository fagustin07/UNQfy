const Command = require("./Command");

class CreatePlaylist extends Command {

    static command() {
        return 'createPlaylist';
    }

    execute(unqfy,args){
        const name = this.valueOf('--name', args);
        const genresToInclude = this.valueOf('--genresToInclude', args).split(',').map(genre => genre.trim())
        const maxDuration = parseInt(this.valueOf('--maxDuration', args));

        return ['ADDED PLAYLIST', unqfy.createPlaylist(name, genresToInclude, maxDuration)];
    }
}

module.exports = CreatePlaylist;