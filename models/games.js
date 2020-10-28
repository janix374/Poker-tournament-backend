const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plyerscoreSchema = new Schema({
    player: { type: Schema.Types.ObjectId, ref:'Player',  required: true},
    score: { type: Number, required: true }
   });

  const gameSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    played: { type: Date, required: true},
    playerscore: [plyerscoreSchema]
  });

  module.exports = mongoose.model('Game', gameSchema);