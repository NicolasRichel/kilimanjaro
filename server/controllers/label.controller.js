/**
 * Labels Controller
 */


const Label = require('../models/label.model');


exports.getAllLabels = [
  async (req, res) => {
    try {
      res.json( await Label.find() );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.getLabel = [
  getLabelByID,
  async (req, res) => res.json( res.data.label )
];

exports.createLabel = [
  async (req, res) => {
    const label = new Label({
      name: req.body.name,
      color: req.body.color,
      textColor: req.body.textColor
    });
    try {
      res.status(201).json( await label.save() );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.updateLabel = [
  getLabelByID,
  async (req, res) => {
    res.data.label.name = req.body.name;
    res.data.label.color = req.body.color;
    res.data.label.textColor = req.body.textColor;
    try {
      res.json( await res.data.label.save() );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.deleteLabel = [
  getLabelByID,
  async (req, res) => {
    try {
      await res.data.label.remove();
      res.json({ message: `Label ${res.data.label.name} deleted successfully.` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.deleteAllLabels = [
  async (req, res) => {
    try {
      await Label.deleteMany({});
      res.json({ message: `Labels purged successfully.` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];


async function getLabelByID(req, res, next) {
  let label = null;
  try {
    label = await Label.findById(req.params.id);
    if (label === null) {
      res.status(404).json({ message: `Label not found (id: ${req.params.id})` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  Object.assign(res, { data: { label } });
  next();
}
