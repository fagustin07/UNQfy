const Command = require("./command");

class AddArtist extends Command {

    static command() {
        return 'addArtist';
    }

    execute(unqfy,args){
        const name = this.valueOf('--name', args);
        const country = this.valueOf('--country', args);
        
        return unqfy.addArtist({ name, country });
    }
}

module.exports = AddArtist;