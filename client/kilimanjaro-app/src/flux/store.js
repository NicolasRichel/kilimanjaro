import { ServiceProvider, Services } from '../service-provider';
import * as utils from '../utils';


export class Store {

  state;
  subscribers;
  registrationKey;

  constructor() {
    this.state = {};
    this.subscribers = [];
    this.registrationKey = ServiceProvider.get(Services.DISPATCHER).register(this);
  }


  getState = () => ({ ...this.state });

  setState = (partialState) => {
    this.state = { ...this.state, ...partialState };
    this.emitChange();
  };

  subscribe = (callback) => {
    const key = utils.generateUUIDv4();
    this.subscribers.push({ key, callback });
    return key;
  };

  subscribeAndGetState = (callback) => ({
    subscriptionKey: this.subscribe(callback),
    state: this.getState()
  });

  unsubscribe = (key) => {
    const index = this.subscribers.findIndex(s => s.key === key);
    (index !== -1) && this.subscribers.splice(index, 1);
  };

  emitChange = () => this.subscribers.forEach(s => s.callback( this.getState() ));

}
