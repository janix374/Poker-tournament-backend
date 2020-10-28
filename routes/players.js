const express = require('express');
const router = express.Router();

const PlayersController = require('../controllers/players');


router.get('/', PlayersController.players_get_all_players);
router.post('/create', PlayersController.players_create_player);
router.get('/:playersId', PlayersController.players_get_one);
router.patch('/:playersId', PlayersController.players_update_players);
router.delete('/:playersId', PlayersController.players_delete);

module.exports = router;