//Promise approach in mongoose
const mongoose = require('mongoose');

const Game = require('../models/games');
const Player = require('../models/player');
const ApiError = require('../error/apiError');

exports.games_create_game = (req, res, next) => {
    const game = new Game({
      _id: new mongoose.Types.ObjectId(),
      played: Date.parse(req.body.played),
      playerscore: req.body.playerscore
     });
    game.save()
    .then(docs => {
        res.status(201).json({docs});
    })
    .catch(err=>{
      next(err);
    });
    
}

exports.games_get_all_games = (req, res, next) => {
  Game.find()
  .select()
  .populate('playerscore.player')
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      games: docs.map(doc => {
        return {
         _id: doc._id,
         played: doc.played,
         playerscore: doc.playerscore,
        };
      })
    });
  })
  .catch(err => {
    next(err);
  });
}

exports.games_get_one = (req, res, next) => {
  const id = req.params.gamesId;
  Game.findById(id)
    .populate('playerscore.player')
    .exec()
    .then(doc => {
      if (!doc) {
        next(ApiError.notFound('Game not found'));
        return;
      }
      res.status(200).json({doc: doc});
    })
    .catch(err => {
      next(err);
    });
}

exports.games_update_game = (req, res, next) => {
  const id = req.params.gamesId;
  const item = {
    played: req.body.played,
    playerscore: req.body.playerscore
  }
  Game.findOneAndUpdate( {_id: id}, {$set: item})
  .exec()
  .then( docs => {
      res.status(200).json({ message: 'game is update' });
  })
  .catch(err => {
    next(err);
  })
}

exports.games_delete = (req, res, next) => {
  const id = req.params.gamesId;
  Game.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({message: 'Game deleted'});
  })
  .catch(err => {
    next(err);
  });
}