const mongoose = require('mongoose');

module.exports = mongoose.model('Label', new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String }
}));
