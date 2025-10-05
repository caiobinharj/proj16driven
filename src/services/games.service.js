const gamesRepository = require('../repositories/games.repository');

const conflictError = (message) => {
    const err = new Error(message);
    err.status = 409;
    return err;
};

async function listGames() {
    return gamesRepository.findAllGames();
}

async function createGame(gameData) {
    const { name, image, stockTotal, pricePerDay } = gameData;

    const existingGame = await gamesRepository.findGameByName(name);
    if (existingGame) {
        throw conflictError('O jogo com este nome já está cadastrado.');
    }

    await gamesRepository.insertGame(name, image, stockTotal, pricePerDay);

}

module.exports = {
    listGames,
    createGame,
};