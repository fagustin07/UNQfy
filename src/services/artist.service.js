const Artist = require('../models/artist');

class ArtistService {

  constructor() {
    this._artists = {};
    this._idCounter = 1;
  }

  addArtist(artistData) {
    if (this._exists(artistData.name, Object.values(this._artists))) throw new Error('Artist alredy exists');
    
    const newId = this._generateId();
    const newArtist = new Artist(newId, artistData.name, artistData.country);

    this._artists[newId] = newArtist;
    return newArtist;
  }

  createAlbum(artistId, albumData) {
    const artist = this.getArtistById(artistId)
    if (this._exists(albumData.name, artist.albums())) throw Error('Album alredy exists');

    const newId = this._generateId();
    const album = artist.createAlbum({ ...albumData, id: newId })

    return album;
  }

  getArtistById(id) {
    return this._getOrThrow(id, Object.values(this._artists), 'Artist not found');
  }


  getAlbumById(id) {
    return this._getOrThrow(id, this._albums(), 'Album not found')
  }

  //PRIVATE

  _albums() {
    return Object.values(this._artists)
      .reduce((albums, artist) => albums.concat(artist.albums()), []);
  }

  _getOrThrow(id, anArray, msgError) {
    let maybeElement = anArray.find(element => element.id === id);
    if (!maybeElement) throw new Error(msgError);

    return maybeElement;
  }

  _generateId() {
    return this._idCounter++;
  }

  _exists(anElement, anArray) {
    return anArray.some(anElementInArray => anElementInArray.name.toLowerCase() === anElement.toLowerCase())
  }
}

module.exports = ArtistService;