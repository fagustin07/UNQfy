![Actions Status: test](https://github.com/fagustin07/UNQfy/workflows/Node%20CI/badge.svg)

# UNQfy
- Proyecto de la materia Servicios Cloud

### Equipo
- Nicolas Martinez @nicolazmartinez0510
- Federico Sandoval @fagustin07

# Diagrama de Clases

![diagrama-de-clases](https://github.com/fagustin07/UNQfy/blob/885586e7b2bfa98f3f9294ca915c103faa0e81f3/imagenes/Diagrama%20de%20clases%20UNQFy.jpg)

# Comandos

- Agregar un artista
```javascript
node main.js addArtist --name Nirvana --country USA
```

- Agregar un album
```javascript
node main.js addAlbum --artistId 1 --name Nevermind --year 1991
```

- Agregar un track
```javascript
node main.js addTrack --albumId 2 --name "Smells like teen spirit" --duration 500 --genres "rock, alternative"
```

- Obtener un artista
```javascript
node main.js getArtist --id 1 
```

- Obtener un album
```javascript
node main.js getAlbum --id 2
```


- Obtener un track
```javascript
node main.js getTrack --id 3
```

- Obtener tracks segun artista
```javascript
node main.js getTracksByArtist --artistName Nirvana
```

- Obtener tracks segun generos
```javascript
node main.js getTracksByGenres --genres "rock, pop"
```

- Crear una playlist
```javascript
node main.js createPlaylist --name "Full Nirvana" --genresByInclude "rock, alternative, metal" --maxDuration 8000
```
