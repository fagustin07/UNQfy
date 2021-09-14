
class Command {

    static canHandle(aCommand) {
        return aCommand === this.command();
    }
    
    static command() {
        throw new Error('Subclass responsability');
    }
    
    valueOf(field, args) {
        const fieldIndex = args.indexOf(field);

        return args[fieldIndex + 1];
    }

    execute(unqfy,args) { 
        throw new Error('Subclass responsability');
    }
}

module.exports = Command;