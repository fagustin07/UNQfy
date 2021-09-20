
const picklify = require('picklify'); // para cargar/guardar unqfy
const fs = require('fs'); // para cargar/guardar unqfy
const Artist = require('./Artist');
const Album = require('./Album');
const Track = require('./Track');
const Playlist = require('./Playlist');
const _idGenerator = require('../lib/IDGenerator');

class UNQfy {

  constructor() {
    this._artists = {};
    this._playlists = {};
  }

  addArtist(artistData) {
    if (this._exists(artistData.name, this._artistsArray())) throw new Error('Artist alredy exists');

    const newArtist = new Artist(artistData.name, artistData.country);

    this._artists[newArtist.id] = newArtist;
    return newArtist;
  }

  addAlbum(artistId, albumData) {
    const artist = this.getArtistById(artistId)
    if (this._exists(albumData.name, artist.albums())) throw Error('Album alredy exists');

    const album = artist.createAlbum(albumData)

    return album;
  }

  addTrack(albumId,trackData) {
    const album = this.getAlbumById(albumId);
    if (this._exists(trackData.name, album.tracks())) throw Error('Track alredy exists');

    const track = album.createTrack(trackData);

    return track;

  }

  getArtistById(id) {
    return this._getOrThrow(id, Object.values(this._artists), 'Artist not found');
  }

  getAlbumById(id) {
    return this._getOrThrow(id, this._albums(), 'Album not found')
  }
  
  getTrackById(id) {
    return this._getOrThrow(id, this._tracks(), 'Track not found')
  }
  
  getPlaylistById(id) {
      return this._getOrThrow(id, this._playlistArray(), 'Playlist not found');
  }

  getTracksMatchingGenres(genres){
    return this._tracks().filter(aTrack => aTrack.haveGenres(genres) )
  }

  getTracksMatchingArtist(artistName){
    let artist = this._artistsArray().find(anArtist => anArtist.name === artistName);
    return artist.getTracks();
  }

  createPlaylist(name, genresToInclude, maxDuration) {
    if (this._exists(name, this._playlistArray())) throw new Error('Playlist alredy exists');

    const tracksByGenre = this.getTracksMatchingGenres(genresToInclude);
    const tracks = this._agroupTracksByMaxDuration(tracksByGenre, maxDuration);

    const newPlaylist = new Playlist(name, tracks);
    this._playlists[newPlaylist.id] = newPlaylist;

    return newPlaylist;
  }

  removeArtistById(id){
    const artist = this.getArtistById(id);
    const albums = artist.albums();
    albums.forEach(album => this.removeAlbumById(album.id));
    delete this._artists[id];
    return artist;
  }

  removeAlbumById(id){
    const album = this.getAlbumById(id);
    const tracks = album.tracks();
    tracks.forEach(track => this.removeTrackById(track.id));
    this._artistsArray().forEach(artist => artist.removeAlbum(album));
    return album;
  }

  removeTrackById(id){
    const track = this.getTrackById(id);
    const trackContainers = this._albums()
                                .concat(this._playlistArray())
                                .filter(container => container.hasTrack(track));
    
    trackContainers.forEach(container => container.removeTrack(track));
    
    return track;
  }

  removePlaylistById(id){
    delete this._playlists[id];
  }


  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Track, _idGenerator, Playlist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }

    //PRIVATE

    _artistsArray() {
      return this._getElementsFrom(this._artists);
    }
  
    _albums() {
      return this._artistsArray().reduce((albums, artist) => albums.concat(artist.albums()), []);
    }
  
    _tracks() {
      return this._albums().reduce((tracks, album) => tracks.concat(album.tracks()), [])
    }
   
    _playlistArray() {
      return this._getElementsFrom(this._playlists);
    }
  
    _getOrThrow(id, anArray, msgError) {
      let maybeElement = anArray.find(element => element.id === id);
      if (!maybeElement) throw new Error(msgError);
  
      return maybeElement;
    }
  
    _exists(anElement, anArray) {
      return anArray.some(anElementInArray => anElementInArray.name.toLowerCase() === anElement.toLowerCase())
    }

    _agroupTracksByMaxDuration(tracks, maxDuration) {
      const tracksAgrouped = [];
      tracks.forEach(aTrack => {
          if (maxDuration > 0 && maxDuration >= aTrack.duration) {
              tracksAgrouped.push(aTrack);
              maxDuration -= aTrack.duration;
          }
      });
      return tracksAgrouped;
  }

  _getElementsFrom(aHash){
    return Object.values(aHash);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
};

