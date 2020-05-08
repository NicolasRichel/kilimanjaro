// Controller Component
// --------------------

const express = require('express');

const apis = [
  require('../domain/labels/label.api'),
  require('../domain/operations/operation.api')
];
const wrappers = [
  /*(0)*/require('../wrappers/next.wrapper'),
  /*(1)*/require('../wrappers/error.wrapper'),
  // /*(2)*/require('../wrappers/log.wrapper')
];

class Controller {

  // router = null;

  constructor() {}

  init() {
    console.log('Init : Controller component');
    this.router = express.Router();
    apis.forEach(
      api => api.routes.forEach(
        route => this.router[ route[0] ](
          route[1],
          wrappers.reduce((mw, wrapper) => wrapper(mw), route[2]),
          route[3]
        )
      )
    );
  }

}

module.exports = new Controller();
