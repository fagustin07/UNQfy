const Command = require("./command");

class AddUser extends Command{
    static command() {
        return 'addUser';
    }

    execute(unqfy,args){
        const username = this.valueOf('--username', args);

        return ['USER ADDED', unqfy.addUser(username)];
    }

    expectedArgsFormatMessage() {
        return 'addUser --username username';
    }

    expectedArgs() {
        return ['--username'];
    }
}

module.exports = AddUser;