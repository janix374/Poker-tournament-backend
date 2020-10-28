const express = require('express');
const router = express.Router();

const GamesController = require('../controllers/games');

router.get('/', GamesController.games_get_all_games);
router.post('/create', GamesController.games_create_game);
router.get('/:gamesId', GamesController.games_get_one);
router.patch('/:gamesId', GamesController.games_update_game);
router.delete('/:gamesId', GamesController.games_delete);

module.exports = router;