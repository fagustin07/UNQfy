const Command = require("./command");

class GetAllArtists extends Command {

    static command() {
        return 'getAllArtists';
    }

    execute(unqfy, args) {
        return ['ARTISTS FOUND', unqfy.getAllArtists()];
    }

}

module.exports = GetAllArtists;