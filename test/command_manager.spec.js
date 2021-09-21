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
const RemovePlaylist = require('../src/commands/removePlaylist');
const RemoveTrack = require('../src/commands/removeTrack');
const RemoveAlbum = require('../src/commands/removeAlbum');
const RemoveArtist = require('../src/commands/removeArtist');
const AddUser = require('../src/commands/addUser');
const Listen = require('../src/commands/listen');
const TimesUserListenedTrack = require('../src/commands/timesUserListenedTrack');
const ThisIs = require('../src/commands/thisIs');
const GetUser = require('../src/commands/getUser');



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

function createAndAddUser(unqfy, username) {
    return unqfy.addUser(username);
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
        const args = ['--name', 'my playlist', '--genresToInclude', "pop, rock", '--maxDuration', 1400]
        const createPlaylistResult = command.execute(unqfy, args)[1];

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
        const getPlaylistResult = command.execute(unqfy, args)[1];

        assert.equal(getPlaylistResult.name, playlist.name);
        assert.equal(getPlaylistResult.id, playlist.id);
        assert.lengthOf(getPlaylistResult.tracks, 0);
    });

    it('should recognized removePlaylist command', () => {
        const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

        const command = new RemovePlaylist();
        const args = ['--id', `${playlist.id}`]
        const removePlaylistResult = command.execute(unqfy, args)[1];

        assert.equal(removePlaylistResult.name, playlist.name);
        assert.equal(removePlaylistResult.id, playlist.id);
        assert.throws(() => unqfy.getPlaylistById(playlist.id), 'Playlist not found');

    });

    it('should recognized removeTrack command', () => {
        const artist = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Thriller', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Thriller', 200, ['pop', 'movie']);

        const command = new RemoveTrack();
        const args = ['--id', `${t1.id}`]
        const removeTrackResult = command.execute(unqfy, args)[1];

        assert.equal(removeTrackResult.name, t1.name);
        assert.equal(removeTrackResult.id, t1.id);
        assert.throws(() => unqfy.getTrackById(t1.id), 'Track not found');

    });

    it('should recognized removeAlbum command', () => {
        const artist = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Thriller', 1987);

        const command = new RemoveAlbum();
        const args = ['--id', `${album.id}`]
        const removeAlbumResult = command.execute(unqfy, args)[1];

        assert.equal(removeAlbumResult.year, album.year);
        assert.equal(removeAlbumResult.name, album.name);
        assert.equal(removeAlbumResult.id, album.id);
        assert.throws(() => unqfy.getAlbumById(album.id), 'Album not found');

    });

    it('should recognized removeArtist command', () => {
        const artist = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');

        const command = new RemoveArtist();
        const args = ['--id', `${artist.id}`]
        const removeArtistResult = command.execute(unqfy, args)[1];

        assert.equal(removeArtistResult.country, artist.country);
        assert.equal(removeArtistResult.name, artist.name);
        assert.equal(removeArtistResult.id, artist.id);
        assert.throws(() => unqfy.getArtistById(artist.id), 'Artist not found');
    });

    it('should recognized addUser command', () => {
        const command = new AddUser();
        const args = ['--username', 'nico0510']
        const addArtistResult = command.execute(unqfy, args)[1];

        assert.equal(addArtistResult, unqfy.getUserById(addArtistResult.id),);
    });


    it('should recognized listen command', () => {
        const artist = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Thriller', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Thriller', 200, ['pop', 'movie']);
        const user = createAndAddUser(unqfy, 'nico0510');

        const timesListenedBefore = unqfy.timesUserListenedTrack(user.id, t1.id)
        const command = new Listen();
        const args = ['--userId', `${user.id}`, '--trackId', `${t1.id}`]
        command.execute(unqfy, args)[1];

        assert.isBelow(timesListenedBefore, unqfy.timesUserListenedTrack(user.id, t1.id))
        assert.equal(unqfy.timesUserListenedTrack(user.id, t1.id), 1);
    });

    it('should recognized timesUserListenTrack command', () => {
        const artist = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Thriller', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Thriller', 200, ['pop', 'movie']);
        const user = createAndAddUser(unqfy, 'nico0510');
        const timesListenedBefore = unqfy.timesUserListenedTrack(user.id, t1.id)

        unqfy.userListenTo(user.id, t1.id);
        unqfy.userListenTo(user.id, t1.id);
        unqfy.userListenTo(user.id, t1.id);
        const command = new TimesUserListenedTrack();
        const args = ['--userId', `${user.id}`, '--trackId', `${t1.id}`]
        const timesListenTrackResult = command.execute(unqfy, args)[1];

        assert.isBelow(timesListenedBefore, timesListenTrackResult)
        assert.equal(timesListenTrackResult, 3);
    });

    it('should recognized thisIs command', () => {
        const artist = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Thriller', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Thriller', 200, ['pop', 'movie']);
        const t2 = createAndAddTrack(unqfy, album.id, 'Another song', 500, ['pop']);
        const t3 = createAndAddTrack(unqfy, album.id, 'Another song II', 500, ['pop']);
        const user = createAndAddUser(unqfy, 'nico0510');

        unqfy.userListenTo(user.id, t1.id);
        unqfy.userListenTo(user.id, t1.id);
        unqfy.userListenTo(user.id, t1.id);
        unqfy.userListenTo(user.id, t2.id);
        unqfy.userListenTo(user.id, t2.id);
        unqfy.userListenTo(user.id, t3.id);
        const command = new ThisIs();
        const args = ['--artistId', `${artist.id}`]
        const thisIsResult = command.execute(unqfy, args)[1];

        assert.equal(thisIsResult.name, 'This is... ' + artist.name);
        assert.lengthOf(thisIsResult.tracks, 3);
        assert.equal(thisIsResult.tracks[0], t1);
        assert.equal(thisIsResult.tracks[1], t2);
        assert.equal(thisIsResult.tracks[2], t3);
    });

    it('should recognized getUser command', () => {
        const user = createAndAddUser(unqfy, 'nico0510');

        const command = new GetUser();
        const args = ['--id', `${user.id}`]
        const getUserResult = command.execute(unqfy, args)[1];

        assert.equal(getUserResult, user);
    });


});