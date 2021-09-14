const ArtistController = require("./ArtistController");

class Controller {
    constructor(){
        this._controller = null;
    }

    controller = () => this._controller

    setController(controller){
        this._controller = controller;
    }

    execute(unqfy, command, args) {
        if(this.controller() !== null) return this._controller.execute(unqfy,command,args);
        else throw Error("Controller not set");
     }
}

module.exports = Controller
