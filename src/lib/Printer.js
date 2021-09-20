class Printer {

    print(text) {
      this._separator();
      console.log(text);
      this._separator();
    }

    printResult(title, commandResult){
        this._title(title);
        this._space();
        if(commandResult instanceof Array){
            this.printArray(commandResult);
        }
        else {
            console.log(JSON.stringify(commandResult));
        }
      }
    
    printArray(array) {
      array.forEach((element) => {
        console.log(JSON.stringify(element));
        this._separator();
      });
    }

  printException(exception) {
    this._separator();
    console.log(`Ups! [UNQfyException]: ${exception.message}`);
    this._separator();
  }

  _title(aTitle) {
    console.log(`============== ${aTitle} ==============`);
  }

  _separator() {
    console.log(`---------------   --------------`);
  }

  _space() {
    console.log();
  }
}
  module.exports = Printer;