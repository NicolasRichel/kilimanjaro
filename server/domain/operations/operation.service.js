// Operations Service
// ==================

const Operation = require('./operation.model');


exports.getAllOperations = async (req, res, next) => {
  const operations = await Operation.find();
  Object.assign(res, { data: { operations } });
  next();
};

exports.getOperationByID = async (req, res, next) => {
  let operation = null;
  operation = await Operation.findById(req.params.id);
  if (operation === null) {
    next(new Error(`Operation not found, id: ${req.params.id}`));
  }
  Object.assign(res, { data: { operation } });
  next();
};

exports.createOperation = async (req, res, next) => {
  let operation = new Operation({
    date: req.body.date,
    amount: req.body.amount,
    reference: req.body.reference,
    labels: req.body.labels
  });
  operation = await operation.save();
  Object.assign(res, { data: { operation } });
  next();
};

exports.updateOperation = async (req, res, next) => {
  res.data.operation.date = req.body.date;
  res.data.operation.amount = req.body.amount;
  res.data.operation.reference = req.body.reference;
  res.data.operation.labels = req.body.labels;
  await res.data.operation.save();
  next();
};

exports.deleteOperation = async (req, res, next) => {
  await res.data.operation.remove();
  next();
};

exports.deleteAllOperations = async (req, res, next) => {
  await Operation.deleteMany({});
  next();
};
