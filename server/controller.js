module.exports = class Controller {

  routes = [];
  mappers = [];
  methods = {};

  constructor(routes, mappers, methods) {
    this.routes = routes;
    this.mappers = mappers;
    Object.keys(methods).forEach(
      methodName => this.methods[methodName] = mappers.reduce(
        (method, mapper) => method.map(mapper), methods[methodName]
      )
    );
  }

  setRoutes(router) {
    this.routes.forEach(
      route => router[ route[0] ]( route[1], this.methods[route[2]] )
    );
  }

}
