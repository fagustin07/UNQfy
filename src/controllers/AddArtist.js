const Command = require("./Command");

class AddArtist extends Command {
    constructor(){
        super("addArtist")
    }

    execute(unqfy,args){
        const name = this.valueOf('--name', args);
        const country = this.valueOf('--country', args);
        
        return unqfy.addArtist({ name, country });
    }
}

module.exports = AddArtist;