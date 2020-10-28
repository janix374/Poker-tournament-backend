const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
  const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
  });

  module.exports = mongoose.model('Player', playerSchema);