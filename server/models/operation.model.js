const mongoose = require('mongoose');

module.exports = mongoose.model('Operation', new mongoose.Schema({
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  reference: { type: String, required: true },
  labels: [{
    name: String,
    color: String,
    textColor: String
  }]
}));
