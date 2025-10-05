const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller');

router.get('/', gamesController.getGames);

router.post('/', gamesController.postGame);

module.exports = router;