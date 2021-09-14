const Command = require("./Command");

class GetArtist extends Command {
    constructor() {
        super("getArtist");
    }

    execute(unqfy, args) {
        const id = this.valueOf('--id', args);
        try {
            return `== ARTIST FOUND === \n${JSON.stringify(unqfy.getArtistById(id))}`;
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    }

}

module.exports = GetArtist;