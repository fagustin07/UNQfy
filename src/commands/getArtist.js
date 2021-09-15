const Command = require("./command");

class GetArtist extends Command {

    static command() {
        return 'getArtist';
    }

    makeBeuty(element){
        return '== ARTIST FOUNDED === \n' + super.makeBeuty(element);
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        try {
            return unqfy.getArtistById(id);
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    }

}

module.exports = GetArtist;