class Printer {

    print(text) {
        console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
        console.log(text);
        console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
    }

    printResult(title, commandResult){
        console.log(`${title}:`);
        console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
        if(commandResult instanceof Array){
            this.printArray(commandResult);
        }
        else {
            console.log(commandResult);
        }
      }
    
    printArray(array) {
      console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
      array.forEach((element) => {
        console.log();
        console.log(element);
        console.log();
      });
      console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>');
    }

  printException(exception) {
    console.error(`Ups! [UNQfyException]: ${exception.message}`);
  }
}
  module.exports = Printer;