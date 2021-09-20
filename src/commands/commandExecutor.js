const AddArtist = require('./AddArtist');
const AddAlbum = require('./AddAlbum.js');
const GetArtist = require('./getArtist');
const GetAlbum = require('./getAlbum');
const AddTrack = require('./AddTrack');
const GetTrack = require('./getTrack');
const GetTracksByGenres = require('./getTracksByGenres');
const GetTracksByArtist = require('./getTracksByArtist');
const CreatePlaylist = require('./createPlaylist');
const GetPlaylist = require('./getPlaylist');
const Printer = require('../lib/Printer');
const UNQfyPersistence = require('../lib/UNQfyPersistence');

class CommandExecutor { 
    constructor() {
        this._commands = [
            AddArtist, AddAlbum, AddTrack, CreatePlaylist,
            GetArtist, GetAlbum, GetTrack, GetTracksByGenres, GetTracksByArtist, GetPlaylist
        ];
        this._printer = new Printer();
        this._unqfyPersistence = new UNQfyPersistence();
    }

    run(command, args) {
        const unqfy = this._unqfyPersistence.getUNQfy();
        let commandFounded = this._commands.find(aCommand => aCommand.canHandle(command));
        
        try {
            this._checkIfExistCommand(commandFounded);

            const result = new commandFounded().execute(unqfy,args);
            const title = result[0];
            const commandResult = result[1];

            this._printer.printResult(title, commandResult);
        } catch(err) {
            this._printer.printException(err);
        }

        this._unqfyPersistence.saveUNQfy(unqfy);
    }

    _checkIfExistCommand(maybeCommand) {
        if (maybeCommand === undefined) throw Error('Command not recognized. Try again.');
    }
}

module.exports = CommandExecutor;