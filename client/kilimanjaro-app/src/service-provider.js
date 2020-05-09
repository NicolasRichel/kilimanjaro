import { BackendService } from './services/backend-service';
import { DialogStore } from './flux/stores/dialog-store';
import { Dispatcher } from './flux/dispatcher';
import { LabelStore } from './flux/stores/label-store';
import { NotificationStore } from './flux/stores/notification-store';
import { OperationStore } from './flux/stores/operation-store';
import { LoggerService } from './services/logger-service';


export const Services = {
  BACKEND_SERVICE: 'backendService',
  DIALOG_STORE: 'dialogStore',
  DISPATCHER: 'dispatcher',
  LABEL_STORE: 'labelStore',
  LOGGER_SERVICE: 'loggerService',
  NOTIFICATION_STORE: 'notificationStore',
  OPERATION_STORE: 'operationStore',
};


const Instances = {
  backendService: null,
  dialogStore: null,
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
        return new BackendService();
      case Services.DIALOG_STORE:
        return new DialogStore();
      case Services.DISPATCHER:
        return new Dispatcher();
      case Services.LABEL_STORE:
        return new LabelStore();
      case Services.LOGGER_SERVICE:
        return new LoggerService();
      case Services.NOTIFICATION_STORE:
        return new NotificationStore();
      case Services.OPERATION_STORE:
        return new OperationStore();
    }
  }

}
