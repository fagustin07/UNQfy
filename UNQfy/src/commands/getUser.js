const Command = require("./command");

class GetUser extends Command {

    static command() {
        return 'getUser';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--id', args));
        
        return ['USER FOUND', unqfy.getUserById(id)];
    }

    isADetailsCommand() {
        return true;
    }

    expectedArgsFormatMessage() {
        return 'getUser --id userId';
    }

    expectedArgs() {
        return ['--id'];
    }
}

module.exports = GetUser;