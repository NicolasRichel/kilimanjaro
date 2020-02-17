/**
 * Operations Controller
 */


const Operation = require('../models/operation.model');


exports.getAllOperations = [
  async (req, res) => {
    try {
      res.json( await Operation.find() );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.getOperation = [
  getOperationByID,
  (req, res) => res.json( res.data.operation )
];

exports.createOperation = [
  async (req, res) => {
    const operation = new Operation({
      date: req.body.date,
      amount: req.body.amount,
      reference: req.body.reference,
      labels: req.body.labels
    });
    try {
      res.status(201).json( await operation.save() );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.updateOperation = [
  getOperationByID,
  async (req, res) => {
    res.data.operation.date = req.body.date;
    res.data.operation.amount = req.body.amount;
    res.data.operation.reference = req.body.reference;
    res.data.operation.labels = req.body.labels;
    try {
      res.json( await res.data.operation.save() );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.deleteOperation = [
  getOperationByID,
  async (req, res) => {
    try {
      await res.data.operation.remove();
      res.json({ message: `Operation ${res.data.operation.reference} deleted successfully.` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.deleteAllOperations = [
  async (req, res) => {
    try {
      await Operation.deleteMany({});
      res.json({ message: `Operations purged successfully.` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];


async function getOperationByID(req, res, next) {
  let operation = null;
  try {
    operation = await Operation.findById(req.params.id);
    if (operation === null) {
      res.status(404).json({ message: `Operation not found (id: ${req.params.id})` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  Object.assign(res, { data: { operation } });
  next();
}
