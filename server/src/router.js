const router = require('express').Router();

// Label routes
require('./domain/labels/label.controller').setRoutes(router);

// Operation routes
require('./domain/operations/operation.controller').setRoutes(router);


module.exports = router;
