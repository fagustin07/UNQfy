const Command = require("./command");

class GetArtist extends Command {

    static command() {
        return 'getArtist';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        try {
            return `== ARTIST FOUND === \n${JSON.stringify(unqfy.getArtistById(id))}`;
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    }

}

module.exports = GetArtist;