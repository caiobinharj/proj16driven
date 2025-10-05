const gamesService = require('../services/games.service');
const gameSchema = require('../schemas/game.schema'); // <-- Importa o Schema
const { badRequestError } = require('../errors/customErrors'); // <-- Importa o erro

async function getGames(req, res, next) {
    try {
        const games = await gamesService.listGames();
        res.status(200).json(games);
    } catch (err) {
        next(err);
    }
}

async function postGame(req, res, next) {
    const gameData = req.body;

    try {
        const { error } = gameSchema.validate(gameData);
        if (error) {
            throw badRequestError(error.details[0].message);
        }

        await gamesService.createGame(gameData);
        res.status(201).send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getGames,
    postGame,
};