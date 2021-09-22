const Command = require("./command");

class RemoveUser extends Command {

    static command() {
        return 'removeUser';
    }

    execute(unqfy,args){
        const userId = parseInt(this.valueOf('--id', args));

        return ['USER REMOVED', unqfy.removeUserById(userId)];
    }

    expectedArgsFormatMessage() {
        return 'removeUser --id userId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = RemoveUser;