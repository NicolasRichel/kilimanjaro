// Label API
// ---------

const service = require('./label.service');

module.exports = {
  routes: [
    [ 'get', '/labels',
      service.getAllLabels,
      (req, res) => res.json( res.data.labels )
    ],
    [ 'get', '/labels/:id',
      service.getLabelByID,
      (req, res) => res.json( res.data.label )
    ],
    [ 'post', '/labels/create',
      service.createLabel,
      (req, res) => res.status(201).json( res.data.label )
    ],
    [ 'patch', '/labels/update/:id',
      service.updateLabel,
      (req, res) => res.json( res.data.label )
    ],
    [ 'delete', '/labels/delete/:id',
      service.deleteLabel,
      (req, res) => res.json( res.data.label )
    ],
    [ 'delete', '/labels/purge',
      service.deleteAllLabels,
      (req, res) => res.json({ message: 'Labels purged successfully.' })
    ]
  ]
};
