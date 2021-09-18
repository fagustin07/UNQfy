const AddArtist = require('./addArtist');
const AddAlbum = require('./addAlbum.js');
const GetArtist = require('./getArtist');
const GetAlbum = require('./getAlbum');
const AddTrack = require('./addTrack');
const GetTrack = require('./getTrack');
const GetTracksByGenres = require('./getTracksByGenres');
const GetTracksByArtist = require('./getTracksByArtist');
const CreatePlaylist = require('./createPlaylist');
const GetPlaylist = require('./getPlaylist');

class CommandManager {
    constructor() {
        this._commands = [
            AddArtist, AddAlbum, AddTrack,
            GetArtist, GetAlbum, GetTrack, GetTracksByGenres, GetTracksByArtist, CreatePlaylist, GetPlaylist
        ];
    }

    addCommand(command) {
        this._commands.push(command);
    }

    findCommand(command) {
        let commandFounded = this._commands.find(aCommand => aCommand.canHandle(command));

        if (commandFounded) return new commandFounded();
        else throw Error("Command not recognized");
    }
}

module.exports = CommandManager;