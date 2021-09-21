const Artist = require('./artist');
const Album = require('./album');
const Playlist = require("./playlist");
const Track = require("./track");

class EntitiesManager {

    constructor() {
        this._artists = {};
        this._playlists = {}
    }

    // CREATE

    addArtist(artistData) {
        if (this._exists(artistData.name, this._getArrayOf(this._artists))) throw new Error('Artist alredy exists');

        const newArtist = new Artist(artistData.name, artistData.country);

        this._artists[newArtist.id] = newArtist;
        return newArtist;
    }

    addAlbum(artistId, albumData) {
        const artist = this.getArtistById(artistId)
        if (this._exists(albumData.name, artist.albums())) throw Error('Album alredy exists');
        
        const album = new Album(albumData.name, albumData.year);
        artist.createAlbum(album);

        return album;
    }

    addTrack(albumId, trackData) {
        const album = this.getAlbumById(albumId);
        if (this._exists(trackData.name, album.tracks())) throw Error('Track alredy exists');
        
        const track = new Track(trackData.name, trackData.duration, trackData.genres);

        album.createTrack(track);

        return track;

    }

    createPlaylist(name, genresToInclude, maxDuration) {
        if (this._exists(name, this._getArrayOf(this._playlists))) throw new Error('Playlist alredy exists');

        const tracksByGenre = this.getTracksMatchingGenres(genresToInclude);
        const tracks = this._agroupTracksByMaxDuration(tracksByGenre, maxDuration);

        const newPlaylist = new Playlist(name, tracks);
        this._playlists[newPlaylist.id] = newPlaylist;

        return newPlaylist;
    }

    // ACCESSORS

    getPlaylistById(id) {
        return this._getOrThrow(id, this._getArrayOf(this._playlists), "Playlist not found");
    }

    getArtistById(id) {
        return this._getOrThrow(id, this._getArrayOf(this._artists), 'Artist not found');
    }

    getAlbumById(id) {
        return this._getOrThrow(id, this._albums(), 'Album not found')
    }

    getTrackById(id) {
        return this._getOrThrow(id, this._tracks(), 'Track not found')
    }

    getTracksMatchingGenres(genres) {
        return this._getArrayOf(this._artists)
            .reduce((tracks, artist) => tracks.concat(artist.getTracksByGenres(genres)), []);
    }

    getTracksMatchingArtist(artistName) {
        let artist = this._getArrayOf(this._artists).find(anArtist => anArtist.name === artistName);
        return artist.getTracks();
    }

    getAllArtists() {
        return this._getArrayOf(this._artists);
    }
    
    getAlbumsFrom(artistId) {
        const artist = this.getArtistById(artistId);
        return artist.albums();
    }

    getTracksFrom(albumId) {
        const album = this.getAlbumById(albumId);
        return album.tracks();
    }

    searchByPartialName(aPartialName) {
        return {
            artists: this._searchByPartialNameIn(this._getArrayOf(this._artists), aPartialName),
            albums: this._searchByPartialNameIn(this._albums(), aPartialName),
            tracks: this._searchByPartialNameIn(this._tracks(), aPartialName),
            playlists: this._searchByPartialNameIn(this._getArrayOf(this._playlists), aPartialName)
        };
    }

    // REMOVE

    removeArtistById(id) {
        const artist = this.getArtistById(id);
        const albums = artist.albums();
        albums.forEach(album => this.removeAlbumById(album.id));
        delete this._artists[id];
        return artist;
    }

    removeAlbumById(id) {
        const album = this.getAlbumById(id);
        const tracks = album.tracks();
        tracks.forEach(track => this.removeTrackById(track.id));
        this._getArrayOf(this._artists).forEach(artist => artist.removeAlbum(album));
        return album;
    }

    removeTrackById(id) {
        const track = this.getTrackById(id);
        const trackContainers = this._albums()
            .concat(this._getArrayOf(this._playlists))
            .filter(container => container.hasTrack(track));

        trackContainers.forEach(container => container.removeTrack(track));
        
        return track;
    }

    removePlaylistById(id) {
        const playlist = this._playlists[id];
        delete this._playlists[id];

        return playlist
    }

    //PRIVATE

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

    _getArrayOf(object) {
        return Object.values(object)
    }

    _albums() {
        return this._getArrayOf(this._artists).reduce((albums, artist) => albums.concat(artist.albums()), []);
    }

    _tracks() {
        return this._albums().reduce((tracks, album) => tracks.concat(album.tracks()), [])
    }

    _searchByPartialNameIn(aRecognizableList, aPartialName) {
        return aRecognizableList
            .filter( obj => obj.name.toLowerCase().includes(aPartialName.toLowerCase()));
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

module.exports = EntitiesManager;