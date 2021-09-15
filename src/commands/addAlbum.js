const Command = require("./command");

class AddAlbum extends Command {

    static command() {
        return 'addAlbum';
    }

    makeBeuty(element){
        return `== NEW ALBUM === \n` + super.makeBeuty(element);
    }

    execute(unqfy,args){
        const artistId = parseInt(this.valueOf('--artistId', args));
        const name = this.valueOf('--name', args);
        const year = parseInt(this.valueOf('--year', args));

        try {
            return unqfy.addAlbum(artistId, { name, year });
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    
    }
}

module.exports = AddAlbum;