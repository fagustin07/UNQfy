/* eslint-env node, mocha */

const assert = require('chai').assert;
const libunqfy = require('../src/models/unqfy');


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

function repeat(times, fun) {
  if (times > 0) {
    fun();
    repeat(times - 1, fun);
  }
}

describe('Add, remove and filter data', () => {
  let unqfy = null;

  beforeEach(() => {
    unqfy = new libunqfy.UNQfy();
  });

  describe('Artist', () => {

    it('should add an artist', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');

      assert.equal(artist.name, 'Guns n\' Roses');
      assert.equal(artist.country, 'USA');

    });

    it('should obtain an artist by id', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const foundArtist = unqfy.getArtistById(artist.id);

      assert.equal(artist, foundArtist);
    });

    it('throws exception when an artist is not found by id', () => {
      const inexistentId = 99999;

      const expectedThrown = () => unqfy.getArtistById(inexistentId);

      assert.throws(expectedThrown, `Artist not found`);
    });

    it('an artist cannot be created with a name that already exists', () => {
      const artist = createAndAddArtist(unqfy, 'Nirvana', 'USA');

      const expectedThrown = () => createAndAddArtist(unqfy, 'Nirvana', 'USA');

      assert.throws(expectedThrown, `Artist alredy exists`);
    });

    it('should delete a artist', () => {
      const artist = createAndAddArtist(unqfy, "Nirvana", "USA")

      unqfy.removeArtistById(artist.id);

      const expectedThrown = () => unqfy.getArtistById(artist.id);

      assert.throws(expectedThrown, `Artist not found`);
    });


  });

  describe('Albums', () => {
    it('should add an album to an artist', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

      assert.equal(album.name, 'Appetite for Destruction');
      assert.equal(album.year, 1987);
    });

    it('should find an album', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

      assert.equal(unqfy.getAlbumById(album.id), album);
    });

    it('an album cannot have a name alredy declared', () => {
      const artist = createAndAddArtist(unqfy, 'Nirvana', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

      const expectedThrown = () => createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

      assert.throws(expectedThrown, `Album alredy exists`);
    });

    it('throws exception when an album is not found by id', () => {
      const inexistentId = 99999;

      const expectedThrown = () => unqfy.getAlbumById(inexistentId);

      assert.throws(expectedThrown, `Album not found`);
    });

    it('should delete a album', () => {
      const artist = createAndAddArtist(unqfy, "Nirvana", "USA");
      const album = createAndAddAlbum(unqfy, artist.id, 'Nevermind', 1991);

      unqfy.removeAlbumById(album.id);

      const expectedThrown = () => unqfy.getAlbumById(album.id);

      assert.throws(expectedThrown, `Album not found`);
    });


  });

  describe('Tracks', () => {

    it('should add a track to an album', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

      assert.equal(track.name, 'Welcome to the jungle');
      assert.strictEqual(track.duration, 200);
      assert.equal(track.genres.includes('rock'), true);
      assert.equal(track.genres.includes('hard rock'), true);
      assert.lengthOf(track.genres, 2);
    });

    it('should find an track', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);


      assert.equal(unqfy.getTrackById(track.id), track);
    });

    it('throws exception when an track is not found by id', () => {
      const inexistentId = 99999;

      const expectedThrown = () => unqfy.getTrackById(inexistentId);

      assert.throws(expectedThrown, `Track not found`);
    });

    it('an track cannot have a name alredy declared', () => {
      const artist = createAndAddArtist(unqfy, 'Nirvana', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

      const expectedThrown = () => createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

      assert.throws(expectedThrown, `Track alredy exists`);
    });

    it('should delete a track', () => {
      const artist = createAndAddArtist(unqfy, "Nirvana", "USA");
      const album = createAndAddAlbum(unqfy, artist.id, 'Nevermind', 1991);
      const track = createAndAddTrack(unqfy, album.id, 'Smells like teen spirit', 500, ['rock', 'alternative']);


      unqfy.removeTrackById(track.id);

      const expectedThrown = () => unqfy.getTrackById(track.id);

      assert.throws(expectedThrown, `Track not found`);
    });

  });

  describe('Playlist Creation and properties', () => {
    let unqfy = null;

    beforeEach(() => {
      unqfy = new libunqfy.UNQfy();
    });

    it('should create a playlist as requested', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
      createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

      const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
      const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
      const t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);
      const t3 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['pop']);
      const t4 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['pop']);

      const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

      assert.equal(playlist.name, 'my playlist');
      assert.isAtMost(playlist.duration(), 1400);
      assert.isTrue(playlist.hasTrack(t1));
      assert.isTrue(playlist.hasTrack(t2));
      assert.isTrue(playlist.hasTrack(t3));
      assert.isTrue(playlist.hasTrack(t4));
      assert.lengthOf(playlist.tracks, 4);
    });

    it('should find a playlist', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
      createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

      const expectedPlaylist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

      const playlist = unqfy.getPlaylistById(expectedPlaylist.id);

      assert.equal(playlist, expectedPlaylist);
    });


    it('an playlist cannot have a name alredy declared', () => {
      const artist = unqfy.createPlaylist('my playlist', ['rock'], 1400);

      const expectedThrown = () => unqfy.createPlaylist('my playlist', ['rock', 'pop'], 800);

      assert.throws(expectedThrown, `Playlist alredy exists`);
    });

    it('throws exception when an playlist is not found by id', () => {
      const inexistentId = 99999;

      const expectedThrown = () => unqfy.getPlaylistById(inexistentId);

      assert.throws(expectedThrown, `Playlist not found`);
    });

    it('should create a playlist by tracks ids', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
      createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

      const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
      const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
      const t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);
      const t3 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['pop']);
      const t4 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['pop']);

      const playlist = unqfy.createPlaylistByIds('my playlist', [t1.id, t2.id, t3.id, t4.id]);

      console.log(playlist)

      assert.equal(playlist.name, 'my playlist');
      assert.isAtMost(playlist.duration(), 1400);
      assert.isTrue(playlist.hasTrack(t1));
      assert.isTrue(playlist.hasTrack(t2));
      assert.isTrue(playlist.hasTrack(t3));
      assert.isTrue(playlist.hasTrack(t4));
      assert.lengthOf(playlist.tracks, 4);
    });


    it('should delete a playlist', () => {
      const playlist = unqfy.createPlaylist('my playlist', ['rock'], 1400);

      unqfy.removePlaylistById(playlist.id);

      const expectedThrown = () => unqfy.getPlaylistById(playlist.id);

      assert.throws(expectedThrown, `Playlist not found`);
    });

    describe('Delete properties', () => {

      it('on delete a track, it delete from playlist and album who contains it', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const track = createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

        const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1700);

        unqfy.removeTrackById(track.id);

        assert.equal(unqfy.getPlaylistById(playlist.id).hasTrack(track), false)
        assert.equal(unqfy.getAlbumById(album.id).hasTrack(track), false)
      });

      it('when delete an artist, delete from UNQfy his albums and tracks', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const track = createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);
        const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

        unqfy.removeArtistById(artist.id);

        assert.throws(() => unqfy.getAlbumById(album.id), 'Album not found');
        assert.throws(() => unqfy.getTrackById(track.id), 'Track not found');
        assert.equal(unqfy.getPlaylistById(playlist.id).hasTrack(track), false)
      });
    });
  });

  it('should find different things by name', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1 = createAndAddAlbum(unqfy, artist1.id, 'Roses Album', 1987);
    const track = createAndAddTrack(unqfy, album1.id, 'Roses track', 200, ['pop', 'movie']);
    const playlist = unqfy.createPlaylist('Roses playlist', ['pop'], 1400);

    const results = unqfy.searchByPartialName('Roses');
    assert.deepEqual(results, {
      artists: [artist1],
      albums: [album1],
      tracks: [track],
      playlists: [playlist],
    });
  });

  it('should get all tracks matching genres', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1 = createAndAddAlbum(unqfy, artist1.id, 'Appetite for Destruction', 1987);
    const t0 = createAndAddTrack(unqfy, album1.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    const t1 = createAndAddTrack(unqfy, album1.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Trhiller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['classic']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['movie']);

    const tracksMatching = unqfy.getTracksMatchingGenres(['pop', 'movie']);

    // assert.equal(tracks.matching.constructor.name, Array);
    assert.isArray(tracksMatching);
    assert.lengthOf(tracksMatching, 4);
    assert.equal(tracksMatching.includes(t0), true);
    assert.equal(tracksMatching.includes(t1), true);
    assert.equal(tracksMatching.includes(t2), true);
    assert.equal(tracksMatching.includes(t3), true);
  });

  it('should get all tracks matching artist', () => {
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

    const matchingTracks = unqfy.getTracksMatchingArtist(artist.name);

    assert.isArray(matchingTracks);
    assert.lengthOf(matchingTracks, 3);
    assert.isTrue(matchingTracks.includes(t1));
    assert.isTrue(matchingTracks.includes(t2));
    assert.isTrue(matchingTracks.includes(t3));
  });

  describe('User', () => {
    it('when an user listen a track, times listen that track increment in one', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track = createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);
      const user = unqfy.addUser('chester');

      unqfy.userListenTo(user.id, track.id);

      assert.equal(unqfy.timesUserListenedTrack(user.id, track.id), 1);
    });

    it('a user should listen many times a track', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track = createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);
      const user = unqfy.addUser('chester');

      unqfy.userListenTo(user.id, track.id);
      unqfy.userListenTo(user.id, track.id);

      assert.equal(unqfy.timesUserListenedTrack(user.id, track.id), 2);
    });

    it('cannot create a user with an existent username', () => {
      unqfy.addUser('chester');

      assert.throws(() => unqfy.addUser('chester'), 'User already exists');
    });

    it('should find a user', () => {
      const expectedUser = unqfy.addUser('nico0510');

      const user = unqfy.getUserById(expectedUser.id);

      assert.equal(user, expectedUser);
    });

    it('should delete a user', () => {
      const user = unqfy.addUser('nico0510');

      unqfy.removeUserById(user.id);

      const expectedThrown = () => unqfy.getUserById(user.id);

      assert.throws(expectedThrown, `User not found`);
    });

    it('Can obtain the top three listen songs from an artist (This is...)', () => {
      const artist = createAndAddArtist(unqfy, 'Anime Openings Voice', 'Japan');
      const album = createAndAddAlbum(unqfy, artist.id, 'Openings I', 2020);
      const jjkOpening = createAndAddTrack(unqfy, album.id, 'JJK', 200, ['pop', 'movie']);
      const shalaEsShala = createAndAddTrack(unqfy, album.id, 'Shala es Shala', 180, ['pop']);
      const narutoOpening = createAndAddTrack(unqfy, album.id, 'We have super powers', 60, ['pop']);
      const hellsingOpening = createAndAddTrack(unqfy, album.id, 'hellsing opening', 60, ['pop']);
      createAndAddTrack(unqfy, album.id, 'song1', 60, ['pop']);
      createAndAddTrack(unqfy, album.id, 'song2', 60, ['pop']);
      createAndAddTrack(unqfy, album.id, 'song3', 60, ['pop']);
      const aUser = unqfy.addUser("pepe");
      const anotherUser = unqfy.addUser("jose");
      repeat(35, () => unqfy.userListenTo(aUser.id, jjkOpening.id));
      repeat(12, () => unqfy.userListenTo(aUser.id, narutoOpening.id));
      repeat(150, () => unqfy.userListenTo(aUser.id, hellsingOpening.id));
      repeat(91, () => unqfy.userListenTo(anotherUser.id, shalaEsShala.id));
      repeat(80, () => unqfy.userListenTo(anotherUser.id, jjkOpening.id));

      const playlistThisIs = unqfy.thisIs(artist.id);

      assert.equal(playlistThisIs.name, 'This is... ' + artist.name);
      assert.lengthOf(playlistThisIs.tracks, 3);
      assert.equal(playlistThisIs.tracks[0], hellsingOpening);
      assert.equal(playlistThisIs.tracks[1], jjkOpening);
      assert.equal(playlistThisIs.tracks[2], shalaEsShala);
    });

  });
});

