
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

    validateArgs(args) {
        this.expectedArgs().forEach(expectedArg => this.checkIfExistArg(expectedArg, args));
    }

    checkIfExistArg(expectedArg, args) {
        const param = args.find(arg => arg === expectedArg); 
        const paramIndex = args.indexOf(param);
        const arg = args[paramIndex+1];

        if(param === undefined || arg === undefined || arg.startsWith('--')) {
            throw new Error('Invalid command format. Try with: ' + this.expectedArgsFormatMessage()); 
        }
    }

    isADetailsCommand() {
        return false;
    }

    expectedArgsFormatMessage() {
        throw new Error('Subclass responsability');
    }

    expectedArgs() {
        throw new Error('Subclass responsability');
    }
}

module.exports = Command;