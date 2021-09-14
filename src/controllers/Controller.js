
class Controller {
    constructor(){
        this._commands = [];
    }

    addCommand(command) {
        this._commands.push(command);
    }

    execute(unqfy,command,args){
        let commandFinded = this._commands.find(aCommand => aCommand.isCommand(command));

        if(commandFinded) return commandFinded.execute(unqfy,args);
        else throw Error("Command not recognized");
        
    }
}

module.exports = Controller
