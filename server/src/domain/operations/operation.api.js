// Operation API
// -------------

const service = require('./operation.service');

function serialize(operation) {
  return {
    _id: operation._id,
    date: operation.date,
    amount: operation.amount,
    reference: operation.reference,
    labels: operation.labels.map(label => label._id)
  };
}

function serializeArray(operations) {
  return operations.map( serialize );
}

module.exports = {
  routes: [
    [ 'get', '/operations',
      service.getAllOperations,
      (req, res) => res.json( serializeArray(res.data.operations) )
    ],
    [ 'get', '/operations/:id',
      service.getOperationByID,
      (req, res) => res.json( serialize(res.data.operation) )
    ],
    [ 'post', '/operations/create',
      service.createOperation,
      (req, res) => res.status(201).json( res.data.operation )
    ],
    [ 'patch', '/operations/update/:id',
      service.updateOperation,
      (req, res) => res.json( serialize(res.data.operation) )
    ],
    [ 'delete', '/operations/delete/:id',
      service.deleteOperation,
      (req, res) => res.json( serialize(res.data.operation) )
    ],
    [ 'delete', '/operations/purge',
      service.deleteAllOperations,
      (req, res) => res.json({ message: 'Operations purged successfully.' })
    ]
  ]
};
