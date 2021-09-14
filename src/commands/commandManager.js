const AddArtist = require('./addArtist');
const GetArtist = require('./getArtist');

class CommandManager {
    constructor(){
        this._commands = [ AddArtist, GetArtist ];
    }

    addCommand(command) {
        this._commands.push(command);
    }

    findCommand(command) {
        let commandFounded = this._commands.find(aCommand => aCommand.canHandle(command));

        if(commandFounded) return new commandFounded();
        else throw Error("Command not recognized");
    }
}

module.exports = CommandManager
