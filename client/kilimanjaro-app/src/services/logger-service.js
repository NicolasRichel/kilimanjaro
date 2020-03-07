
export const LogLevels = {
  ERROR: { index: 0, name: 'ERROR', color: 'red' },
  WARNING: { index: 1, name: 'WARNING', color: 'orange' },
  INFO: { index: 2, name: 'INFO', color: 'green' },
  DEBUG: { index: 3, name: 'DEBUG', color: 'cornflowerblue' }
};

export class LoggerService {

  level;

  constructor(config) {
    this.level = config.logLevel || LogLevels.ERROR;
  }


  error = (message) => this._log(LogLevels.ERROR, message);
  warning = (message) => this._log(LogLevels.WARNING, message);
  info = (message) => this._log(LogLevels.INFO, message);
  debug = (message) => this._log(LogLevels.DEBUG, message);


  _log = (level, message) => (this.level.index >= level.index) && console.log(
    `%c[${new Date().toISOString()}], ${level.name}: ${message}`, `color: ${level.color}`
  );

}
