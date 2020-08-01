// Operation Service
// -----------------

const { CustomPeriod } = require('../../utils/period-utils');
const { Label } = require('../labels/label.model');
const { Operation } = require('./operation.model');
const { Op } = require('sequelize');

async function getAllOperations(req, res) {
  const operations = await Operation.findAll({
    include: [{ model: Label, as: 'labels' }]
  });
  Object.assign(res, { data: { operations } });
}

async function getOperationByPeriod(req, res) {
  const operations = await Operation.findAll({
    include: [{ model: Label, as: 'labels' }],
    where: {
      date: {
        [Op.between]: [req.query['start-date'], req.query['end-date']]
      }
    }
  });
  Object.assign(res, { data: { operations } });
}

async function getOperationGroupedByPeriod(req, res) {
  const period = new CustomPeriod(req.query['start-date'], req.query['end-date']);
  const partition = period.partition(req.query.period);
  Object.assign(res, { data: { groupedOperations: {} } });
  for (p of partition) {
    res.data.groupedOperations[`${p[0]}_${p[1]}`] = await Operation.findAll({
      include: [{ model: Label, as: 'labels' }],
      where: { date: { [Op.between]: p } }
    }).map(
      op => ({ 
        _id: op._id,
        date: op.date,
        amount: op.amount,
        reference: op.reference,
        labels: op.labels.map(l => l._id)
      })
    );
  };
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

async function bulkSetLabel(req, res) {
  const operations = await Operation.findAll({
    include: [{ model: Label, as: 'labels' }],
    where: {
      _id: {
        [Op.in]: req.body.operations
      }
    }
  });
  operations.forEach(async op => {
    await op.setLabels( op.labels.concat(req.body.label) );
    await op.save();
  });
}

module.exports = {
  getAllOperations,
  getOperationByPeriod,
  getOperationGroupedByPeriod,
  getOperationByID,
  createOperation,
  updateOperation,
  deleteOperation,
  deleteAllOperations,
  bulkSetLabel
};
