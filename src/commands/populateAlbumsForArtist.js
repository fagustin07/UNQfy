const Command = require("./command");

class PopulateAlbumsForArtist extends Command {

    static command() {
        return 'populateAlbumsForArtist';
    }

    async execute(unqfy,args){
        const artistName = this.valueOf('--name', args)

        const albums = await unqfy.populateAlbumsForArtist(artistName);        
        return ['ARTIST POPULATED', albums];
    }

    expectedArgsFormatMessage() {
        return 'populateAlbumsForArtist --name artistName';
    }

    expectedArgs() {
        return ['--name'];
    }
}

module.exports = PopulateAlbumsForArtist;