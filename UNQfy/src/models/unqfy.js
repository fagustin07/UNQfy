const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guardar unqfy
const Artist = require('./artist');
const Album = require('./album');
const Track = require('./track');
const User = require('./user');
const _idGenerator = require('../lib/IDGenerator');
const Playlist = require('./playlist');
const PlaylistGenerator = require('./playlistGenerator');
const Pair = require('../lib/pair');
const EntitiesManager = require('./entitiesManager');
const spotifyClient = require('../helpers/clients/spotifyClient');
const { EntityNotFound, RelatedEntityNotFound } = require('../errors/model_errors');
const Observable = require('./observable');
const ObserverManager = require('./observerManager');
const Logging = require('./logging');
const Newsletter = require('./newsletter');
const Action = require('./action');
require('dotenv').config();

class UNQfy extends Observable {

  constructor() {
    super();
    this._entitiesManager = new EntitiesManager();
    this.addObserver(new Logging(), Object.keys(Action));
    this.addObserver(new Newsletter(), [Action.addAlbum, Action.deleteArtist]);
  }

  addArtist(artistData) {
    const newArtist = this._entitiesManager.addArtist(artistData);
    this._notify(Action.addArtist, newArtist);
    return newArtist;
  }

  addAlbum(artistId, albumData) {
    const album = this._entitiesManager.addAlbum(artistId, albumData);
    this._notify(Action.addAlbum, album);
    return album;
  }

  addTrack(albumId, trackData) {
    const newTrack = this._entitiesManager.addTrack(albumId, trackData);
    this._notify(Action.addTrack, newTrack);
    return newTrack;
  }

  getAllArtists() {
    return this._entitiesManager.getAllArtists();
  }

  getAllUsers() {
    return this._entitiesManager.getAllUsers();
  }

  getAlbumsFrom(artistId) {
    return this._entitiesManager.getAlbumsFrom(artistId);
  }

  getTracksFrom(albumId) {
    return this._entitiesManager.getTracksFrom(albumId);
  }

  getArtistById(id) {
    return this._entitiesManager.getArtistById(id);
  }

  getAlbumById(id) {
    return this._entitiesManager.getAlbumById(id);
  }

  getTrackById(id) {
    return this._entitiesManager.getTrackById(id);

  }

  getPlaylistById(id) {
    return this._entitiesManager.getPlaylistById(id);
  }

  getUserById(id) {
    return this._entitiesManager.getUserById(id);
  }

  removeArtistById(id) {
    const deletedArtist = this._entitiesManager.removeArtistById(id);
    this._notify(Action.deleteArtist, deletedArtist);
    return deletedArtist;
  }

  removeAlbumById(id) {
    const deletedAlbum = this._entitiesManager.removeAlbumById(id);
    this._notify(Action.deleteAlbum, deletedAlbum);
    return deletedAlbum;
  }

  removeTrackById(id) {
    const deletedTrack = this._entitiesManager.removeTrackById(id);
    this._notify(Action.deleteTrack, deletedTrack);
    return deletedTrack;
  }

  removePlaylistById(id) {
    const deletedPlaylist = this._entitiesManager.removePlaylistById(id);
    this._notify(Action.deletePlaylist, deletedPlaylist);
    return deletedPlaylist;
  }

  removeUserById(id) {
    const deletedUser = this._entitiesManager.removeUserById(id);
    this._notify(Action.deletePlaylist, deletedUser);
    return deletedUser;
  }

  getTracksMatchingGenres(genres) {
    return this._entitiesManager.getTracksMatchingGenres(genres);
  }

  getTracksMatchingArtist(artistName) {
    return this._entitiesManager.getTracksMatchingArtist(artistName);
  }

  getArtistByName(artistName) {
    return this._entitiesManager.getArtistByName(artistName);
  }

  searchByPartialName(aPartialName) {
    return this._entitiesManager.searchByPartialName(aPartialName || '');
  }

  searchPlaylists(filters) {
    return this.searchByPartialName(filters.name)
      .playlists
      .filter(playlist => playlist.hasDuration(filters.durationGT, filters.durationLT));
  }

  createPlaylist(name, genresToInclude, maxDuration) {
    const newPlaylist = this._entitiesManager.createPlaylist(name, genresToInclude, maxDuration);
    this._notify(Action.addPlaylist, newPlaylist);
    return newPlaylist;
  }

  createPlaylistByIds(name, tracksIds) {
    const newPlaylist = this._entitiesManager.createPlaylistByIds(name, tracksIds);
    this._notify(Action.addPlaylist, newPlaylist);
    return newPlaylist;
  }

  populateAlbumsForArtist(artistName) {
    const artist = this.getArtistByName(artistName);
    if (!artist.hasPopulated) {
      return spotifyClient.getAlbumsFrom(artistName)
        .then(albums => albums.forEach(album => this.addAlbum(artist.id, { name: album.name, year: album.year })))
        .then(_ => artist.populated())
        .then(_ => 'Artist ' + artistName.toLowerCase() + ' successfully populated')
    } else {
      return 'Artist ' + artistName.toLowerCase() + ' already populated.'
    }
  }

  getLyrics(trackId) {
    try {
      return this.getTrackById(trackId)
        .getLyrics()
        .then((lyrics) => lyrics);
    } catch(err) {
      if (err instanceof EntityNotFound && err.message.startsWith('Track')) {
        throw new RelatedEntityNotFound('Track');
      } else {
        throw err;
      }
    }
  }

  addUser(username) {
    const newUser = this._entitiesManager.addUser(username);
    this._notify(Action.addUser, newUser);
    return newUser;
  }

  userListenTo(aUserId, aTrackId) {
    const user = this._entitiesManager.userListenTo(aUserId, aTrackId);
    this._notify(Action.trackListen, {userId: aUserId, trackId: aTrackId});
    return user;
  }

  userListenPlaylist(aUserId, aPlaylistId) {
    return this._entitiesManager.userListenPlaylist(aUserId, aPlaylistId);
  }

  timesUserListenedTrack(aUserId, aTrackId) {
    return this._entitiesManager.timesUserListenedTrack(aUserId, aTrackId);
  }

  thisIs(artistId) {
    return this._entitiesManager.thisIs(artistId);
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    const classes = [
      UNQfy, Artist, Album, Track, _idGenerator, Playlist, User,
      EntitiesManager, Pair, PlaylistGenerator,
      Action, ObserverManager, Logging, Newsletter, Observable];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

module.exports = {
  UNQfy: UNQfy,
};



