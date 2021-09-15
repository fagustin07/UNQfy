const Command = require("./command");

class GetAlbum extends Command {

    static command() {
        return 'getAlbum';
    }

    makeBeuty(element){
        return '== ALBUM FOUNDED === \n' + super.makeBeuty(element);
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        try {
            return unqfy.getAlbumById(id);
        } catch(error) {
            return `UNQfy error: ${err.message}`;
        }
    }

}

module.exports = GetAlbum;