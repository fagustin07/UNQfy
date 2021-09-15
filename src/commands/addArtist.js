const Command = require("./command");

class AddArtist extends Command {

    static command() {
        return 'addArtist';
    }

    makeBeuty(element){
        return '== NEW ARTIST === \n' + super.makeBeuty(element);
    }

    execute(unqfy,args){
        const name = this.valueOf('--name', args);
        const country = this.valueOf('--country', args);

        try {
            return unqfy.addArtist({ name, country });
        } catch (err) {
            return `UNQfy error: ${err.message}`;
        }
    }
}

module.exports = AddArtist;