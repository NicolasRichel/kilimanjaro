import { BackendService } from './backend.service';
import { Config } from '../app-config';
import { Dispatcher } from '../flux/dispatcher';
import { LabelStore } from '../flux/label-store';
import { OperationStore } from '../flux/operation-store';


const Instances = {
  backendService: null,
  dispatcher: null,
  operationStore: null,
  labelStore: null
};

export const Services = {
  BACKEND_SERVICE: 'backendService',
  DISPATCHER: 'dispatcher',
  OPERATION_STORE: 'operationStore',
  LABEL_STORE: 'labelStore'
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
      case Services.OPERATION_STORE:
        return new OperationStore();
      case Services.LABEL_STORE:
        return new LabelStore();
    }
  }

}
