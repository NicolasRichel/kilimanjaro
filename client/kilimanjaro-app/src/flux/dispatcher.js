export class Dispatcher {

  stores;

  constructor() {
    this.stores = [];
  }


  register = (store) => {
    this.stores.push( store );
    return this.stores.length - 1;
  };

  unregister = (index) => this.stores.splice(index, 1);

  dispatch = (action) => this.stores.forEach(store => store.handleAction(action));

}
