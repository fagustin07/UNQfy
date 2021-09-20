/* eslint-env node, mocha */

const assert = require('chai').assert;
const libunqfy = require('../src/models/unqfy');
const AddArtist = require('../src/commands/addArtist');
const AddAlbum = require('../src/commands/addAlbum');
const AddTrack = require('../src/commands/addTrack');
const CreatePlaylist = require('../src/commands/createPlaylist');
const GetAlbum = require('../src/commands/getAlbum');
const GetArtist = require('../src/commands/getArtist');
const GetPlaylist = require('../src/commands/getPlaylist');
const GetTrack = require('../src/commands/getTrack');
const GetTracksByArtist = require('../src/commands/getTracksByArtist');
const GetTracksByGenres = require('../src/commands/getTracksByGenres');

function createAndAddArtist(unqfy, artistName, country) {
    const artist = unqfy.addArtist({ name: artistName, country });
    return artist;
  }
  
  function createAndAddAlbum(unqfy, artistId, albumName, albumYear) {
    return unqfy.addAlbum(artistId, { name: albumName, year: albumYear });
  }
  
  function createAndAddTrack(unqfy, albumId, trackName, trackDuraction, trackGenres) {
    return unqfy.addTrack(albumId, { name: trackName, duration: trackDuraction, genres: trackGenres });
  }

describe('Commands from command-line interpretation', () => {
    let unqfy = null;

    beforeEach(() => {
        unqfy = new libunqfy.UNQfy();
    });

    it('should recognized addArtist command', () => {
        const command = new AddArtist();
        const args = ['--name', 'riky', '--country', 'venezuela'];

        const artist = command.execute(unqfy, args)[1];

        assert.equal(artist, unqfy.getArtistById(artist.id));
    });

    it('should recognized getArtist command', () => {
        const expectedArtist = unqfy.addArtist({ name: 'jose', country: 'puerto rico' });
        const command = new GetArtist();
        const args = ['--id', `${expectedArtist.id}`];

        const getArtistResult = command.execute(unqfy, args)[1];

        assert.equal(
            getArtistResult,
            expectedArtist);
    });

    it('should recognized addAlbum command', () => {
        const artist = unqfy.addArtist({ name: 'pepe', country: 'US' });

        const command = new AddAlbum();
        const args = ['--artistId', `${artist.id}`, '--name', 'mi argentina', '--year', '2020'];

        const album = command.execute(unqfy, args)[1];

        assert.equal(album, unqfy.getAlbumById(album.id));
    });

    it('should recognized getAlbum command', () => {
        const artist = unqfy.addArtist({ name: 'pepe', country: 'US' });
        const expectedAlbum = unqfy.addAlbum(artist.id, { name: 'mi argentina', year: 2021 });
        const command = new GetAlbum();
        const args = ['--id', `${expectedAlbum.id}`];

        const getAlbumResult = command.execute(unqfy, args)[1];

        assert.equal(
            getAlbumResult,
            expectedAlbum);
    });

    it('should recognized addTrack command', () => {
        const artist = unqfy.addArtist({ name: 'Nirvana', country: 'USA' });
        const album = unqfy.addAlbum(artist.id, { name: 'Appetite for Destruction', year: 1987 })

        const command = new AddTrack();
        const args = ['--albumId', `${album.id}`, '--name', 'Welcome to the jungle', '--duration', '200', '--genres', 'rock,alternative'];

        const track = command.execute(unqfy, args)[1];

        assert.equal(track, unqfy.getTrackById(track.id));
    });

    it('should recognized getTrack command', () => {
        const artist = unqfy.addArtist({ name: 'Nirvana', country: 'US' });
        const album = unqfy.addAlbum(artist.id, { name: 'Appetite for Destruction', year: 1987 })
        const expectedTrack = unqfy.addTrack(album.id, { name: 'Welcome to the jungle', duration: 200, genres: ['rock', 'alternative'] });
        const command = new GetTrack();
        const args = ['--id', `${expectedTrack.id}`];

        const getTrackResult = command.execute(unqfy, args)[1];

        assert.equal(
            getTrackResult,
            expectedTrack);
    });

    it('should recognized getTracksByGenres command', () => {
        const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album1 = createAndAddAlbum(unqfy, artist1.id, 'Appetite for Destruction', 1987);
        createAndAddTrack(unqfy, album1.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
        const t1 = createAndAddTrack(unqfy, album1.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);

        const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
        const t2 = createAndAddTrack(unqfy, album2.id, 'Trhiller', 200, ['pop', 'movie']);
        const t4 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['classic']);
        createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['movie']);

        const command = new GetTracksByGenres();
        const args = ['--genres', "pop, classic"];

        const getTracksByGenresResult = command.execute(unqfy, args)[1];

        assert.isArray(getTracksByGenresResult);
        assert.lengthOf(getTracksByGenresResult, 3);
        assert.equal(getTracksByGenresResult.includes(t1), true);
        assert.equal(getTracksByGenresResult.includes(t2), true);
        assert.equal(getTracksByGenresResult.includes(t4), true);
    });

    it('should recognized getTracksByArtist command', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
    const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);

    const album2 = createAndAddAlbum(unqfy, artist.id, 'Use Your Illusion I', 1992);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Don\'t Cry', 500, ['rock', 'hard rock']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album3 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    createAndAddTrack(unqfy, album3.id, 'Thriller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album3.id, 'Another song', 500, ['classic']);
    createAndAddTrack(unqfy, album3.id, 'Another song II', 500, ['movie']);
    
    const command = new GetTracksByArtist();
    const args = ['--artistName', `${artist.name}`];

    const getTracksByArtistResult = command.execute(unqfy, args)[1];

    assert.isArray(getTracksByArtistResult);
    assert.lengthOf(getTracksByArtistResult, 3);
    assert.isTrue(getTracksByArtistResult.includes(t1));
    assert.isTrue(getTracksByArtistResult.includes(t2));
    assert.isTrue(getTracksByArtistResult.includes(t3));
    });

    it('should recognized createPlaylist command', () => {
        const artist = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Thriller', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Thriller', 200, ['pop', 'movie']);
        const t2 = createAndAddTrack(unqfy, album.id, 'Another song', 500, ['pop']);
        const t3 = createAndAddTrack(unqfy, album.id, 'Another song II', 500, ['pop']);
        
        const command = new CreatePlaylist();
        const args = ['--name', 'my playlist', '--genresToInclude',"pop, rock", '--maxDuration', 1400]
        const createPlaylistResult = command.execute(unqfy,args)[1];

        assert.equal(createPlaylistResult.name, 'my playlist');
        assert.isAtMost(createPlaylistResult.duration(), 1400);
        assert.isTrue(createPlaylistResult.hasTrack(t1));
        assert.isTrue(createPlaylistResult.hasTrack(t2));
        assert.isTrue(createPlaylistResult.hasTrack(t3));
        assert.lengthOf(createPlaylistResult.tracks, 3);
      });

      it('should recognized getPlaylist command', () => {
        const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

        const command = new GetPlaylist();
        const args = ['--id', `${playlist.id}`]
        const getPlaylistResult = command.execute(unqfy,args)[1];

        assert.equal(getPlaylistResult.name, playlist.name);
        assert.equal(getPlaylistResult.id, playlist.id);
        assert.lengthOf(getPlaylistResult.tracks, 0);
      });


});