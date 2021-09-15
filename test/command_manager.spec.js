/* eslint-env node, mocha */

const assert = require('chai').assert;
const CommandManager = require('../src/commands/commandManager');
const libunqfy = require('../src/models/unqfy');
 
describe('Command manager and commands', () => {
    let commandManager = null;
    let unqfy = null;

    beforeEach(() => {
      commandManager = new CommandManager();
      unqfy = new libunqfy.UNQfy();
    });

    it('should recognized addArtist command', () => {
        const command = commandManager.findCommand('addArtist');
        const args = ['--name', 'riky', '--country', 'venezuela'];
        
        const artist = command.execute(unqfy, args);

        assert.equal(artist, unqfy.getArtistById(artist.id) );
    });

    it('should recognized getArtist command', () => {
        const expectedArtist = unqfy.addArtist({name: 'jose', country: 'puerto rico'});
        const command = commandManager.findCommand('getArtist');
        const args = ['--id', `${expectedArtist.id}`];

        const getArtistResult = command.execute(unqfy, args);

        assert.equal(
            getArtistResult,
            expectedArtist);
    });

    it('should recognized addAlbum command', () => {
        const artist = unqfy.addArtist({name: 'pepe', country: 'US'});

        const command = commandManager.findCommand('addAlbum');
        const args = ['--artistId', `${artist.id}`, '--name', 'mi argentina', '--year', '2020'];
        
        const album = command.execute(unqfy, args);

        assert.equal(album, unqfy.getAlbumById(album.id) );
    });

    it('should recognized getAlbum command', () => {
        const artist = unqfy.addArtist({name: 'pepe', country: 'US'});
        const expectedAlbum = unqfy.addAlbum(artist.id, {name: 'mi argentina', year: 2021});
        const command = commandManager.findCommand('getAlbum');
        const args = ['--id', `${expectedAlbum.id}`];

        const getAlbumResult = command.execute(unqfy, args);

        assert.equal(
            getAlbumResult,
            expectedAlbum);
    });

});