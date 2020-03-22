// Operations Controller
// =====================

const Controller = require('../../controller');
const {
  getOperationByID,
  getAllOperations,
  createOperation,
  updateOperation,
  deleteOperation,
  deleteAllOperations
} = require('./operation.service');


module.exports = new Controller(
  [ // Routes
    [ 'get', '/operations', 'getAllOperations' ],
    [ 'get', '/operation/:id', 'getOperation' ],
    [ 'post', '/operation/create', 'createOperation' ],
    [ 'patch', '/operation/update/:id', 'updateOperation' ],
    [ 'delete', '/operation/delete/:id', 'deleteOperation' ],
    [ 'delete', '/operations/purge', 'deleteAllOperations' ]
  ],
  [ // Mappers
    require('../../mappers/error-handling.mapper')
  ],
  { // Methods
    getAllOperations: [
      getAllOperations,
      (req, res) => res.json( res.data.operations )
    ],
    getOperation: [
      getOperationByID,
      (req, res) => res.json( res.data.operation )
    ],
    createOperation: [
      createOperation,
      (req, res) => res.status(201).json( res.data.operation )
    ],
    updateOperation: [
      getOperationByID,
      updateOperation,
      (req, res) => res.json( res.data.operation )
    ],
    deleteOperation: [
      getOperationByID,
      deleteOperation,
      (req, res) => res.json( res.data.operation )
    ],
    deleteAllOperations: [
      deleteAllOperations,
      (req, res) => res.json({ message: `Operations purged successfully.` })
    ]
  }
);
