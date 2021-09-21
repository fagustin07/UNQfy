![Actions Status: test](https://github.com/fagustin07/UNQfy/workflows/Node%20CI/badge.svg)

# UNQfy
- Proyecto de la materia Servicios Cloud

### Equipo
- Nicolas Martinez @nicolazmartinez0510
- Federico Sandoval @fagustin07

# Diagrama de Clases
- Primera version:

![diagrama-de-clases](https://github.com/fagustin07/UNQfy/blob/d2ddad895a4dc601c2fe4859159c205a11fb03f4/imagenes/Diagrama%20de%20clases%20UNQFy.jpg)

- Segunda version:

![diagrama-de-clases](https://github.com/fagustin07/UNQfy/blob/d2ddad895a4dc601c2fe4859159c205a11fb03f4/imagenes/Diagrama%20de%20clases%20UNQFy%20ver%202.jpg)


# Command Pattern

Para utilizar la interfaz provista por el objeto UNQFy en forma de comandos desde la consola hemos propuesto el patron de diseño Command. Dicho patron fue diseñado de la siguiente forma:

![command-pattern](https://github.com/fagustin07/UNQfy/blob/e6f59b7d2448b090cdb2db1952d6ff2c872a1010/imagenes/Command%20Pattern.jpg)

De esta forma logramos:
- Abstraer comportamiento
- Reducir la cantidad de codigo repetido

# Comandos

### Create

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

- Crear una playlist
```javascript
node main.js createPlaylist --name "Full Nirvana" --genresToInclude "rock, alternative, metal" --maxDuration 8000
```

- Agregar un usuario
```javascript
node main.js addUser --username pepito999
```

### Accessors

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

- Obtener una playlist
```javascript
node main.js getPlaylist --id 4
```

- Obtener todos los artistas
```javascript
node main.js getAllArtists
```

- Obtener todos los albums de un artista
```javascript
node main.js getAlbumsFrom --artistId 1
```

- Obtener todos los tracks de un album
```javascript
node main.js getTracksFrom --albumId 2
```

- Busqueda parcial
```javascript
node main.js searchByPartialName --name "Nirv"
```

- Obtener usuario
```javascript
node main.js getUser --id 5
```

- This is Nirvana
```javascript
node main.js thisIs --userId 1
```

### Remove

- Borrar un artista
```javascript
node main.js removeArtist --id 1
```

- Borrar un album
```javascript
node main.js removeAlbum --id 2
```

- Borrar un track
```javascript
node main.js removeTrack --id 3
```

- Borrar una playlist
```javascript
node main.js removePlaylist --id 4
```

### User

- Escuchar cancion
```javascript
node main.js listen --userId 5 --trackId 3
```

- Saber cuantas veces escuche una cancion
```javascript
node main.js timesUserListenTrack --userId 5 --trackId 3
```



