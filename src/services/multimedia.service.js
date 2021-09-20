const Artist = require('../models/artist');
const Playlist = require("../models/playlist");


class MultimediaService {

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

        const album = artist.createAlbum(albumData)

        return album;
    }

    addTrack(albumId, trackData) {
        const album = this.getAlbumById(albumId);
        if (this._exists(trackData.name, album.tracks())) throw Error('Track alredy exists');

        const track = album.createTrack(trackData);

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

    getTracksFrom(artistId) {
        const artist = this.getArtistById(artistId);
        return artist.albums().tracks();
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
        delete this._playlists[id];
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

    _getOrThrow(id, anArray, msgError) {
        let maybeElement = anArray.find(element => element.id === id);
        if (!maybeElement) throw new Error(msgError);

        return maybeElement;
    }

    _exists(anElement, anArray) {
        return anArray.some(anElementInArray => anElementInArray.name.toLowerCase() === anElement.toLowerCase())
    }
}

module.exports = MultimediaService;