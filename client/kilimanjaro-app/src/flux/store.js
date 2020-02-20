import { ServiceProvider, Services } from '../services/service-provider';


export class Store {

  state;
  subscribers;
  registrationKey;

  constructor() {
    this.state = {};
    this.subscribers = [];
    this.registrationKey = ServiceProvider.get(Services.DISPATCHER).register(this);
  }


  getState = () => this.state;

  setState = (partialState) => {
    this.state = { ...this.state, ...partialState };
    this.emitChange();
  };

  subscribe = (callback) => {
    this.subscribers.push( callback );
    return this.subscribers.length - 1;
  };

  subscribeAndGetState = (callback) => ({
    subscriptionKey: this.subscribe(callback),
    state: this.state
  });

  unsubscribe = (index) => this.subscribers.splice(index, 1);

  emitChange = () => this.subscribers.forEach(callback => callback({ ...this.state }));

}
