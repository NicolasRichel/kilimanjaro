// Operation Service
// -----------------

const { Label } = require('../labels/label.model');
const { Operation } = require('./operation.model');

async function getAllOperations(req, res) {
  const operations = await Operation.findAll({
    include: [{ model: Label, as: 'labels' }]
  });
  Object.assign(res, { data: { operations } });
}

async function getOperationByID(req, res) {
  let operation = null;
  operation = await Operation.findByPk(req.params.id, {
    include: [{ model: Label, as: 'labels' }]
  });
  if (operation === null) {
    throw new Error(`Operation not found, id: ${req.params.id}`);
  }
  Object.assign(res, { data: { operation } });
}

async function createOperation(req, res) {
  let operation = await Operation.create({
    date: req.body.date,
    amount: req.body.amount,
    reference: req.body.reference
  });
  if (req.body.labels) {
    await operation.setLabels( req.body.labels );
    await operation.save();
    operation.dataValues.labels = req.body.labels;
  }
  Object.assign(res, { data: { operation } });
}

async function updateOperation(req, res) {
  await getOperationByID(req, res);
  Object.assign(res.data.operation, req.body);
  await res.data.operation.save();
  if (req.body.labels) {
    await res.data.operation.setLabels( req.body.labels );
  }
  await res.data.operation.save();
  await getOperationByID(req, res);
}

async function deleteOperation(req, res) {
  await getOperationByID(req, res);
  await res.data.operation.destroy();
}

async function deleteAllOperations(req, res) {
  await Operation.destroy({ truncate: true });
}

module.exports = {
  getAllOperations,
  getOperationByID,
  createOperation,
  updateOperation,
  deleteOperation,
  deleteAllOperations
};
