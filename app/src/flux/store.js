import Dispatcher from './dispatcher';
import * as utils from '../utils';

export class Store {

  state;
  data;
  subscribers;
  registrationKey;

  constructor() {
    this.state = {};
    this.data = {};
    this.subscribers = [];
    this.registrationKey = Dispatcher.register(this);
  }

  
  setState = (partialState) => {
    this.state = { ...this.state, ...partialState };
  };
  
  getData = () => ({ ...this.data });

  setData = (partialData) => {
    this.data = { ...this.data, ...partialData };
    this.emitChange();
  };

  subscribe = (callback) => {
    const key = utils.generateUUIDv4();
    this.subscribers.push({ key, callback });
    return key;
  };

  subscribeAndGetState = (callback) => ({
    subscriptionKey: this.subscribe(callback),
    state: this.getData()
  });

  unsubscribe = (key) => {
    const i = this.subscribers.findIndex(s => s.key === key);
    (i !== -1) && this.subscribers.splice(i, 1);
  };

  emitChange = () => this.subscribers.forEach(s => s.callback( this.getData() ));

}
