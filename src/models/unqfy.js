
const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guardar unqfy
const Artist = require('./artist');
const Album = require('./album');
const Track = require('./track');
const Playlist = require('./playlist');
const ArtistManager = require('../managers/ArtistManager');
const PlaylistManager = require('../managers/PlaylistManager');
const _idGenerator = require('../lib/IDGenerator');

class UNQfy {

  constructor() {
    this._artistManager = new ArtistManager();
    this._playlistManager = new PlaylistManager(this._artistManager);
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
    return this._artistManager.addArtist(artistData);
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
    
    return this._artistManager.addAlbum(artistId, albumData)
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
    return this._artistManager.addTrack(albumId,trackData)
  }

  getArtistById(id) {
    return this._artistManager.getArtistById(id);
  }

  getAlbumById(id) {
    return this._artistManager.getAlbumById(id);
  }

  getTrackById(id) {
    return this._artistManager.getTrackById(id);

  }

  getPlaylistById(id) {
    return this._playlistManager.getPlaylistById(id);
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    return this._artistManager.getTracksMatchingGenres(genres)
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    return this._artistManager.getTracksMatchingArtist(artistName)
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
    return this._playlistManager.createPlaylist(name,genresToInclude,maxDuration);
  }

  removeArtist(id){
    const artist = this.getArtistById(id);
    const albums = artist.albums;
    albums.forEach(album => this.removeAlbum(album.id));
    delete this._artists[id];
    return artist;
  }

  removeAlbum(id){
    const album = this.getAlbumById(id);
    const tracks = album.tracks;
    tracks.forEach(track => this.removeTrack(track.id));
    this.getArtists().forEach(artist => artist.removeAlbum(album));
    return album;
  }

  removeTrack(id){
    const track = this.getTrackById(id);
    const conteiners = this.getAlbums().concat(this.getPlayLists());
    conteiners.forEach(conteiner => conteiner.removeTrack(track));
    return track;
  }
  
  removePlayList(id){
    delete this._playLists[id];
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, ArtistManager, Artist, Album, Track, _idGenerator, Playlist, PlaylistManager];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

