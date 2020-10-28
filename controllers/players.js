//Async-await approach in mongoose
const mongoose = require('mongoose');
const Player = require('../models/player');
const ApiError = require('../error/apiError');

exports.players_get_all_players = async (req, res, next) => {
    try{
        let players = await Player.find();
        //Destructuring
        const response = {
            count: players.length,
            players: players.map( player => {
                return {
                    id: player._id,
                    name: player.name,
                }
            }),
        }
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
  }

exports.players_get_one = async (req, res, next) => {
    let id = req.params.playersId;
    try {
        let players = await Player.findById(id)
        if ( players ) {
            res.status(200).json({players});
        } else {
            next(ApiError.badRequest('Cannot find player'));
            return;
        }
    } catch (err) {
        next(err);
    }
}

exports.players_create_player = async (req, res, next) => {
    let player = new Player({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name.toLowerCase(),
    });
    try {
        let newPlayer = await player.save()
        res.status(201).json(newPlayer);
    } catch (err) {
        next(err);
    }
}

exports.players_delete = async (req, res, next) => {
    const id = req.params.playersId;
    try {
        await Player.remove({_id: id});
        res.json({ message: 'Player deleted' });
    } catch (err) {
        next(err);
    }
}

exports.players_update_players =  async (req, res, next) => {
    if( req.body.name == ''){
        throw new Error('cant be empty'); // Express will catch this on its own.
    }
    const id = req.params.playersId;
    const updatePlayer = {};
    updatePlayer.name = req.body.name.toLowerCase();
        try {
            let player = await Player.findByIdAndUpdate(id, updatePlayer,{new: true}, function(err, player){
            // Handle any possible database errors
                if (err) {
                    next(ApiError.notAcceptable('canot add player'));
                    return;
                }
                res.json(player);
            });
        } catch (err) {
            next(err);
        }
}