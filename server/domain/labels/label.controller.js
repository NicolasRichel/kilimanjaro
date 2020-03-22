// Labels Controller
// =================

const Controller = require('../../controller');
const {
  getAllLabels,
  getLabelByID,
  createLabel,
  updateLabel,
  deleteLabel,
  deleteAllLabels,
  removeLabelFromOperations,
  removeAllLabelsFromOperations
} = require('./label.service');


module.exports = new Controller(
  [ // Routes
    [ 'get', '/labels', 'getAllLabels' ],
    [ 'get', '/label/:id', 'getLabel' ],
    [ 'post', '/label/create', 'createLabel' ],
    [ 'patch', '/label/update/:id', 'updateLabel' ],
    [ 'delete', '/label/delete/:id', 'deleteLabel' ],
    [ 'delete', '/labels/purge', 'deleteAllLabels' ]
  ],
  [ // Mappers
    require('../../mappers/error-handling.mapper')
  ],
  { // Methods
    getAllLabels: [
      getAllLabels,
      (req, res) => res.json( res.data.labels )
    ],
    getLabel: [
      getLabelByID,
      (req, res) => res.json( res.data.label )
    ],
    createLabel: [
      createLabel,
      (req, res) => res.status(201).json( res.data.label )
    ],
    updateLabel: [
      getLabelByID,
      updateLabel,
      (req, res) => res.json( res.data.label )
    ],
    deleteLabel: [
      getLabelByID,
      removeLabelFromOperations,
      deleteLabel,
      (req, res) => res.json( res.data.label )
    ],
    deleteAllLabels: [
      removeAllLabelsFromOperations,
      deleteAllLabels,
      (req, res) => res.json({ message: 'Labels purged successfully.' })
    ]
  }
);
