const db = require('../databases/database');

async function findAllRentals() {
    const query = `
    SELECT 
      r.*, 
      c.name AS "customerName",
      g.name AS "gameName", 
      g."pricePerDay"
    FROM rentals r
    JOIN customers c ON r."customerId" = c.id
    JOIN games g ON r."gameId" = g.id;
  `;
    const result = await db.query(query);
    return result.rows;
}

async function countOpenRentalsByGameId(gameId) {
    const query = `
    SELECT COUNT(*) 
    FROM rentals 
    WHERE "gameId" = $1 AND "returnDate" IS NULL;
  `;
    const result = await db.query(query, [gameId]);
    return parseInt(result.rows[0].count);
}

async function insertRental(customerId, gameId, rentDate, daysRented, originalPrice) {
    const query = `
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") 
    VALUES ($1, $2, $3, $4, $5);
  `;
    await db.query(query, [customerId, gameId, rentDate, daysRented, originalPrice]);
}

async function findRentalDetailsById(id) {
    const query = `
        SELECT 
            r.*,
            g."pricePerDay"
        FROM 
            rentals r
        JOIN 
            games g ON r."gameId" = g.id
        WHERE 
            r.id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function closeRental(id, returnDate, delayFee) {
    const query = `
        UPDATE rentals 
        SET "returnDate" = $1, "delayFee" = $2 
        WHERE id = $3;
    `;
    await db.query(query, [returnDate, delayFee, id]);
}

async function deleteRental(id) {
    const query = 'DELETE FROM rentals WHERE id = $1;';
    await db.query(query, [id]);
}

module.exports = {
    findAllRentals,
    countOpenRentalsByGameId,
    insertRental,
    findRentalDetailsById,
    closeRental,
    deleteRental
};