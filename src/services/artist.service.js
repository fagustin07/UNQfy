const Artist = require('../models/artist');

class ArtistService {

  constructor() {
    this._artists = {};
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

  getTracksMatchingGenres(genres){
    return this._tracks().filter(aTrack => aTrack.haveGenres(genres) )
  }

  getTracksMatchingArtist(artistName){
    let artist = this._artistsArray().find(anArtist => anArtist.name === artistName);
    return artist.getTracks();
  }

  

  //PRIVATE

  _artistsArray() {
    return Object.values(this._artists);
  }

  _albums() {
    return this._artistsArray().reduce((albums, artist) => albums.concat(artist.albums()), []);
  }

  _tracks() {
    return this._albums().reduce((tracks, album) => tracks.concat(album.tracks()), [])
  }

  _getOrThrow(id, anArray, msgError) {
    let maybeElement = anArray.find(element => element.id === id);
    if (!maybeElement) throw new Error(msgError);

    return maybeElement;
  }

  _exists(anElement, anArray) {
    return anArray.some(anElementInArray => anElementInArray.name.toLowerCase() === anElement.toLowerCase())
  }
}

module.exports = ArtistService;