
const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guardar unqfy
const Artist = require('./artist');
const Album = require('./album');
const Track = require('./track');
const _idGenerator = require('../lib/IDGenerator');
const Playlist = require('./playlist');
const EntitiesManager = require('./entitiesManager');

class UNQfy {

  constructor() {
    this._entitiesManager = new EntitiesManager();
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    return this._entitiesManager.addArtist(artistData);
  }

  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    
    return this._entitiesManager.addAlbum(artistId, albumData)
  }


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    return this._entitiesManager.addTrack(albumId,trackData)
  }

  getAllArtists() {
    return this._entitiesManager.getAllArtists();
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

  getUserById(id){
    return this._entitiesManager.getUserById(id)
  }

  removeArtistById(id){
    return this._entitiesManager.removeArtistById(id)
  }

  removeAlbumById(id){
    return this._entitiesManager.removeAlbumById(id)
  }

  removeTrackById(id){
    return this._entitiesManager.removeTrackById(id)
  }

  removePlaylistById(id){
    return this._entitiesManager.removePlaylistById(id)
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    return this._entitiesManager.getTracksMatchingGenres(genres)
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    return this._entitiesManager.getTracksMatchingArtist(artistName)
  }

  searchByPartialName(aPartialName) {
    return this._entitiesManager.searchByPartialName(aPartialName);
  }

  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    return this._entitiesManager.createPlaylist(name,genresToInclude,maxDuration);
  }

  // USERS

    //Usuarios:
    addUser(username){
      return this._entitiesManager.addUser(username);
    }
  
    userListenTo(aUserId, aTrackId){
      return this._entitiesManager.userListenTo(aUserId, aTrackId);
    }
  
    timesUserListenedTrack(aUserId, aTrackId){
      return this._entitiesManager.timesUserListenedTrack(aUserId, aTrackId);
    }
  
    thisIs(artistId){
      return this._entitiesManager.thisIs(artistId);
    }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Track, _idGenerator, Playlist, EntitiesManager];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

