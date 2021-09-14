const Artist = require('../models/artist');

class ArtistService {

    constructor() {
      this._artists = {};
      this._idCounter = 1;
    }

    addArtist(artistData) {
      const newId = this._generateId();
      if(this._exists(artistData.name)) throw Error('Artist alredy exists')
      const newArtist = new Artist(newId, artistData.name, artistData.country);
      
      this._artists[newId] = newArtist;
      return newArtist;
    }
  
    getArtistById(id) {
      return this._getOrThrow(id, 'Artist not found');
    }

    //PRIVATE
    _getOrThrow(id, msgError) {
        const maybeArtist = this._artists[id];
        if (!maybeArtist) throw new Error(msgError);

        return maybeArtist;
    }

    _generateId() {
        return this._idCounter++;
    }

    _exists(artistName){
      let artists = Object.values(this._artists)
      return artists.some(anArtist => anArtist.name.toLowerCase() === artistName.toLowerCase())
    }
}

module.exports = ArtistService;