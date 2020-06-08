// Label Service
// -------------

const { Label } = require('./label.model');

async function getAllLabels(req, res) {
  const labels = await Label.findAll();
  Object.assign(res, { data: { labels } });
};

async function getLabelByID(req, res) {
  let label = null;
  label = await Label.findByPk(req.params.id);
  if (label === null) {
    throw new Error(`Label not found, id: ${req.params.id}`);
  }
  Object.assign(res, { data: { label } });
};

async function createLabel(req, res) {
  let label = await Label.create({
    name: req.body.name,
    color: req.body.color,
    textColor: req.body.textColor
  });
  Object.assign(res, { data: { label } });
};

async function updateLabel(req, res) {
  await getLabelByID(req, res);
  res.data.label.name = req.body.name;
  res.data.label.color = req.body.color;
  res.data.label.textColor = req.body.textColor;
  await res.data.label.save();
};

async function deleteLabel(req, res) {
  await getLabelByID(req, res);
  await res.data.label.destroy();
};

async function deleteAllLabels(req, res) {
  await Label.destroy({ truncate: true });
};

module.exports = {
  getAllLabels,
  getLabelByID,
  createLabel,
  updateLabel,
  deleteLabel,
  deleteAllLabels
};
