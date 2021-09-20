const Command = require("./Command");

class AddArtist extends Command {

    static command() {
        return 'addArtist';
    }

    execute(unqfy,args){
        const name = this.valueOf('--name', args);
        const country = this.valueOf('--country', args);

        return ['ADDED ARTIST', unqfy.addArtist({ name, country })];
    }
}

module.exports = AddArtist;