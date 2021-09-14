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
        const args = ['--id', 1];

        const getArtistResult = command.execute(unqfy, args);

        assert.equal(
            getArtistResult,
            `== ARTIST FOUND === \n${JSON.stringify(expectedArtist)}`);
    });

});