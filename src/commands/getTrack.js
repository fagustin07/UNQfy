const Command = require("./command");

class GetTrack extends Command {

    static command() {
        return 'getTrack';
    }

    makeBeuty(element){
        return '== TRACK FOUNDED === \n' + super.makeBeuty(element);
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        try {
            return unqfy.getTrackById(id);
        } catch(err) {
            return `UNQfy error: ${err.message}`;
        }
    }

}

module.exports = GetTrack;