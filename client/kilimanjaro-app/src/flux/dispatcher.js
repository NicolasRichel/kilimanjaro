import * as utils from '../utils';

class Dispatcher {

  stores;

  constructor() {
    this.stores = [];
  }

  register = (store) => {
    const key = utils.generateUUIDv4();
    this.stores.push({ key, store });
    return key;
  };

  unregister = (key) => {
    const i = this.stores.findIndex(s => s.key === key);
    (i !== -1) && this.stores.splice(i, 1);
  };

  dispatch = (action) => this.stores.forEach(s => s.store.handleAction(action));

}

export default new Dispatcher();
