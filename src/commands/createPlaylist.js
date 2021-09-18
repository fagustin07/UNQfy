const Command = require("./command");

class CreatePlaylist extends Command {

    static command() {
        return 'createPlaylist';
    }

    makeBeuty(element){
        return '== NEW PLAYLIST === \n' + super.makeBeuty(element);
    }

    execute(unqfy,args){
        const name = this.valueOf('--name', args);
        const genresToInclude = this.valueOf('--genresToInclude', args).split(',').map(genre => genre.trim())
        const maxDuration = this.valueOf('--maxDuration', args);

        try {
            return unqfy.createPlaylist(name, genresToInclude, maxDuration);
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    }
}

module.exports = CreatePlaylist;