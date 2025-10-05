// src/repositories/games.repository.js
const db = require('../databases/database');

async function findAllGames() {
    const query = 'SELECT * FROM games;';
    const result = await db.query(query);
    return result.rows;
}

async function findGameByName(name) {
    const query = 'SELECT * FROM games WHERE name = $1;';
    const result = await db.query(query, [name]);
    return result.rows[0];
}

async function insertGame(name, image, stockTotal, pricePerDay) {
    const query = `
    INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
    VALUES ($1, $2, $3, $4);
  `;
    await db.query(query, [name, image, stockTotal, pricePerDay]);
}

async function findGameById(id) {
    const query = 'SELECT * FROM games WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    findAllGames,
    findGameByName,
    insertGame,
    findGameById
};