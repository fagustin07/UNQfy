const AddArtist = require('./AddArtist');
const AddAlbum = require('./AddAlbum.js');
const AddTrack = require('./AddTrack');
const CreatePlaylist = require('./createPlaylist');

const GetAlbum = require('./getAlbum');
const GetArtist = require('./getArtist');
const GetTrack = require('./getTrack');
const GetTracksByGenres = require('./getTracksByGenres');
const GetTracksByArtist = require('./getTracksByArtist');
const GetPlaylist = require('./getPlaylist');
const GetAllArtists = require('./getAllArtists');
const GetAlbumsFrom = require('./getAlbumsFrom');
const GetTracksFrom = require('./getTracksFrom');
const SearchByPartialName = require('./searchByPartialName');

const RemoveArtist = require('./removeArtist');
const RemoveAlbum = require('./removeAlbum');
const RemoveTrack = require('./removeTrack');
const RemovePlaylist = require('./removePlaylist');
const RemoveUser = require('./removeUser');

const Printer = require('../lib/Printer');
const UNQfyPersistence = require('../lib/UNQfyPersistence');

class CommandExecutor { 
    constructor() {
        this._commands = [
            AddArtist, AddAlbum, AddTrack, CreatePlaylist,
            GetArtist, GetAlbum, GetTrack, GetTracksByGenres, GetTracksByArtist, GetPlaylist,
            GetAllArtists, GetAlbumsFrom, GetTracksFrom,
            SearchByPartialName,
            RemoveArtist, RemoveAlbum, RemoveTrack, RemovePlaylist, RemoveUser
        ];
        this._printer = new Printer();
        this._unqfyPersistence = new UNQfyPersistence();
    }

    run(command, args) {
        const unqfy = this._unqfyPersistence.getUNQfy();
        let maybeCommand = this._commands.find(aCommand => aCommand.canHandle(command));
        
        try {
            this._checkIfExistCommand(maybeCommand);
            const commandFound = new maybeCommand(); 
            commandFound.validateArgs(args);
            
            const result = commandFound.execute(unqfy,args);
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