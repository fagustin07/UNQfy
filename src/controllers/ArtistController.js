
class ArtistController {

    valueOf(field, args) {
        const fieldIndex = args.indexOf(field);

        return args[fieldIndex + 1];
    }
    
    execute(unqfy, command, args) {
        switch (command) {
            case 'addArtist':
              const name = this.valueOf('--name', args);
              const country = this.valueOf('--country', args);
              
              return unqfy.addArtist({ name, country });
            case 'getArtist':
              const id = this.valueOf('--id', args);
              try {
                return `== ARTIST FOUND === \n${JSON.stringify(unqfy.getArtistById(id))}`;
              } catch (err) {
                return `UNQfy error: ${err.message}`;
              }
          }
    }
}

module.exports = ArtistController
