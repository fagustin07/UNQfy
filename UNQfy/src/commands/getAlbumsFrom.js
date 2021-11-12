const Command = require("./command");

class GetAlbumsFrom extends Command {

    static command() {
        return 'getAlbumsFrom';
    }

    execute(unqfy, args) {
        const id = parseInt(this.valueOf('--artistId', args));

        return ['ALBUMS FOUND', unqfy.getAlbumsFrom(id)];
    }

    expectedArgsFormatMessage() {
        return 'getAlbumsFrom --artistId artistId';
    }

    expectedArgs() {
        return ['--artistId'];
    }
}

module.exports = GetAlbumsFrom;