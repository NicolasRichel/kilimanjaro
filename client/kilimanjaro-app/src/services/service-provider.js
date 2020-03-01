import { BackendService } from './backend.service';
import { Config } from '../app-config';
import { Dispatcher } from '../flux/dispatcher';
import { LabelStore } from '../flux/label-store';
import { NotificationStore } from '../flux/notification-store';
import { OperationStore } from '../flux/operation-store';
import { LoggerService } from './logger-service';


export const Services = {
  BACKEND_SERVICE: 'backendService',
  DISPATCHER: 'dispatcher',
  LABEL_STORE: 'labelStore',
  LOGGER_SERVICE: 'loggerService',
  NOTIFICATION_STORE: 'notificationStore',
  OPERATION_STORE: 'operationStore',
};


const Instances = {
  backendService: null,
  dispatcher: null,
  labelStore: null,
  loggerService: null,
  notificationStore: null,
  operationStore: null,
};

export const ServiceProvider = {

  get(service) {
    if ( !Instances[service] ) {
      Instances[service] = this.createService(service);
    }
    return Instances[service];
  },

  createService(service) {
    switch (service) {
      case Services.BACKEND_SERVICE:
        return new BackendService( Config );
      case Services.DISPATCHER:
        return new Dispatcher();
      case Services.LABEL_STORE:
        return new LabelStore();
      case Services.LOGGER_SERVICE:
        return new LoggerService( Config );
      case Services.NOTIFICATION_STORE:
        return new NotificationStore( Config );
      case Services.OPERATION_STORE:
        return new OperationStore();
      default: // To avoid warnings in console
    }
  }

}
