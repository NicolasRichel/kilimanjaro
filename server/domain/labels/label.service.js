// Labels Service
// ==============

const Label = require('./label.model');
const Operation = require('../operations/operation.model');


exports.getAllLabels = async (req, res, next) => {
  const labels = await Label.find();
  Object.assign(res, { data: { labels } });
  next();
};

exports.getLabelByID = async (req, res, next) => {
  let label = null;
  label = await Label.findById(req.params.id);
  if (label === null) {
    next(new Error(`Label not found, id: ${req.params.id}`));
  }
  Object.assign(res, { data: { label } });
  next();
};

exports.createLabel = async (req, res, next) => {
  let label = new Label({
    name: req.body.name,
    color: req.body.color,
    textColor: req.body.textColor
  });
  label = await label.save();
  Object.assign(res, { data: { label } });
  next();
};

exports.updateLabel = async (req, res, next) => {
  res.data.label.name = req.body.name;
  res.data.label.color = req.body.color;
  res.data.label.textColor = req.body.textColor;
  await res.data.label.save()
  next();
};

exports.deleteLabel = async (req, res, next) => {
  await res.data.label.remove();
  next();
};

exports.deleteAllLabels = async (req, res, next) => {
  await Label.deleteMany({});
  next();
};

exports.removeLabelFromOperations = async (req, res, next) => {
  const labelID = String(res.data.label._id);
  const operations = await Operation.find({ labels: labelID });
  for (op of operations) {
    op.labels = op.labels.filter(l => l !== labelID);
    await op.save();
  }
  next();
}

exports.removeAllLabelsFromOperations = async (req, res, next) => {
  const operations = await Operation.find();
  for (op of operations) {
    op.labels = [];
    await op.save();
  }
  next();
};
