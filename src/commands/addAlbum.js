const Command = require("./command");

class AddAlbum extends Command {

    static command() {
        return 'addAlbum';
    }

    execute(unqfy,args){
        const artistId = parseInt(this.valueOf('--artistId', args));
        const name = this.valueOf('--name', args);
        const year = parseInt(this.valueOf('--year', args));
        
        return unqfy.addAlbum(artistId, { name, year });
    }
}

module.exports = AddAlbum;