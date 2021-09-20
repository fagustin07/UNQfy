class Printer {

    print(text) {
        console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
        console.log(text);
        console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
    }

    printResult(title, commandResult){
        console.log('');
        console.log(`${title}:`);
        this._space();
        if(commandResult instanceof Array){
            this.printArray(commandResult);
        }
        else {
            console.log(commandResult);
        }
      }
    
    printArray(array) {
      this._space();
      array.forEach((element) => {
        console.log();
        console.log(element);
        console.log();
      });
      this._space();
    }

  printException(exception) {
    console.error(`Ups! [UNQfyException]: ${exception.message}`);
  }

  _space() {
    console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
  }
}
  module.exports = Printer;