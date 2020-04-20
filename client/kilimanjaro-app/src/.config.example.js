import { LogLevels } from './services/logger-service';


// Kilimanjaro App Config

export const Config = {
  serverURL: 'http://<SERVER-DOMAIN>:<SERVER-PORT>',
  logLevel: LogLevels.ERROR, // One of ERROR, WARNING, INFO, DEBUG
  notificationTimeout: 5000 // in milliseconds
};
