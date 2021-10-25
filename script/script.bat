cd ../

@REM ARTISTS

node main.js addArtist --name "don cangrejo" --country "USA" @REM #1
node main.js addArtist --name "Queen" --country "Argentina" @REM #2
node main.js addArtist --name "Bon Jovi" --country "USA" @REM #3
node main.js addArtist --name "patricio" --country "Argentina" @REM #4


@REM ALBUMS

node main.js addAlbum --artistId 2 --name "Vida" --year 2010 @REM #5
node main.js addAlbum --artistId 2 --name "Muerte" --year 2012 @REM #6
node main.js addAlbum --artistId 1 --name "Blue" --year 2006 @REM #7
node main.js addAlbum --artistId 2 --name "Greatest Hits" --year 1974 @REM #8
node main.js addAlbum --artistId 3 --name "Cross Road" --year 1997 @REM #9
node main.js addAlbum --artistId 3 --name "mi vida" --year 2006 @REM #10


@REM TRACKS:


node main.js addTrack --albumId 5 --name "Maquiavelico" --duration 248 --genres "rock, rap, pop" @REM #11
node main.js addTrack --albumId 5 --name "Es epico" --duration 336 --genres "rock, rap, heavy" @REM #12
node main.js addTrack --albumId 6 --name "Advertencia" --duration 262 --genres "rock, trap" @REM #13
node main.js addTrack --albumId 6 --name "Paseo por el barrio" --duration 334 --genres "rock, pop" @REM #14
node main.js addTrack --albumId 6 --name "Ciudad de piedra" --duration 277 --genres "ballet, heavy" @REM #15
node main.js addTrack --albumId 5 --name "Stop" --duration 270 --genres "reggae" @REM #16
node main.js addTrack --albumId 6 --name "Jeremias" --duration 171 --genres "rock, reggae" @REM #17
node main.js addTrack --albumId 7 --name "A name" --duration 206 --genres "rap, pop" @REM #18
node main.js addTrack --albumId 7 --name "El hombre de la estrella" --duration 202 --genres "reggae"  @REM #19
node main.js addTrack --albumId 7 --name "El revelde" --duration 224 --genres "rock" @REM #20
node main.js addTrack --albumId 9 --name "It's my life" --duration 198 --genres "pop" @REM #21
node main.js addTrack --albumId 9 --name "Always" --duration 212 --genres "rock, pop, reggae"  @REM #22
node main.js addTrack --albumId 8 --name "Black Dog" --duration 255 --genres "ballet"  @REM #23
node main.js addTrack --albumId 8 --name "Since i have been loving you" --duration 188 --genres "reggae, pop" @REM #24
node main.js addTrack --albumId 8 --name "Dazed and confused" --duration 246 --genres "rap, pop"  @REM #25
node main.js addTrack --albumId 10 --name "Adios nonino" --duration 266 --genres "pop"  @REM #26
node main.js addTrack --albumId 8 --name "Bohemian Rhapsody" --duration 420 --genres "rock" @REM #27

@REM # PLAYLISTS 

node main.js createPlaylist --name "Insomio" --maxDuration 3000 --genresToInclude "rock"  @REM #28
node main.js createPlaylist --name "Relaxing Music" --maxDuration 1400 --genresToInclude "pop, reggae" @REM 29
node main.js createPlaylist --name "bailar" --maxDuration 1000 --genresToInclude "ballet" @REM 30


@REM # USERS 

node main.js addUser --username "chestersaurio"  @REM #31
node main.js addUser --username "nicolin" @REM #32

node main.js listen --userId 31 --trackId 11
node main.js listen --userId 31 --trackId 11
node main.js listen --userId 31 --trackId 11
node main.js listen --userId 31 --trackId 11
node main.js listen --userId 31 --trackId 11
node main.js listen --userId 31 --trackId 11
node main.js listen --userId 31 --trackId 11
node main.js listen --userId 31 --trackId 12
node main.js listen --userId 31 --trackId 13
node main.js listen --userId 31 --trackId 14
node main.js listen --userId 31 --trackId 15
node main.js listen --userId 31 --trackId 16
node main.js listen --userId 31 --trackId 17
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 18
node main.js listen --userId 31 --trackId 19
node main.js listen --userId 31 --trackId 20
node main.js listen --userId 31 --trackId 21
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 22
node main.js listen --userId 31 --trackId 23
node main.js listen --userId 31 --trackId 24
node main.js listen --userId 31 --trackId 24
node main.js listen --userId 31 --trackId 24
node main.js listen --userId 31 --trackId 24
node main.js listen --userId 31 --trackId 24
node main.js listen --userId 31 --trackId 24
node main.js listen --userId 31 --trackId 24
node main.js listen --userId 31 --trackId 25
node main.js listen --userId 31 --trackId 26
node main.js listen --userId 31 --trackId 27

node main.js listen --userId 32 --trackId 11
node main.js listen --userId 32 --trackId 12
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 13
node main.js listen --userId 32 --trackId 14
node main.js listen --userId 32 --trackId 15
node main.js listen --userId 32 --trackId 16
node main.js listen --userId 32 --trackId 17
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 18
node main.js listen --userId 32 --trackId 19
node main.js listen --userId 32 --trackId 19
node main.js listen --userId 32 --trackId 20
node main.js listen --userId 32 --trackId 20
node main.js listen --userId 32 --trackId 20
node main.js listen --userId 32 --trackId 20
node main.js listen --userId 32 --trackId 20
node main.js listen --userId 32 --trackId 20
node main.js listen --userId 32 --trackId 20
node main.js listen --userId 32 --trackId 21
node main.js listen --userId 32 --trackId 22
node main.js listen --userId 32 --trackId 23
node main.js listen --userId 32 --trackId 24
node main.js listen --userId 32 --trackId 25
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 26
node main.js listen --userId 32 --trackId 27