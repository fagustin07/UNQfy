const winstonLogger = require('./logger_consumer');
const { EmptyMessage, InvalidLevel } = require('./errors');

class Logger {
  constructor() {
    this.logger = winstonLogger;
  }

  log(level, message, object) {
    this._validateMessage(message);

    switch (level) {
        case 'info':
            this.logger.info(message, { object });
            break;
        case 'error':
            this.logger.error(message, { object });
            break;
        case 'warn':
            this.logger.warn(message, { object });
            break;
        case 'debug':
            this.logger.debug(message, { object });
            break;
        default:
          throw new InvalidLevel();
    }
  }

  change() {
    this.logger.silent = !this.logger.silent;
    console.log(`Logger has been turned ${this.logger.silent ? 'off' : 'on'}.`);
  }

  isActive() {
    return !this.logger.silent;
  }

  _validateMessage(message) {
    if(!message || message.length === 0) {
      throw new EmptyMessage();
    }
  }
}

const loggerSingleton = new Logger();
module.exports = loggerSingleton;
