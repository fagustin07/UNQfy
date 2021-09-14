
class Command {
    constructor(name) {
        this.name = name;
    }

    isCommand(command) {
        return this.name.toLowerCase() === command.toLowerCase();
    }

    valueOf(field, args) {
        const fieldIndex = args.indexOf(field);

        return args[fieldIndex + 1];
    }

    execute(unqfy,args) { }
}

module.exports = Command;