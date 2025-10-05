const rentalsService = require('../services/rentals.service');
const { badRequestError } = require('../errors/customErrors');

const validateId = (id) => {
    id = parseInt(id);
    if (isNaN(id) || id <= 0) {
        throw badRequestError('ID inválido. Deve ser um número inteiro positivo.');
    }
    return id;
};

async function getRentals(req, res, next) {
    try {
        const rentals = await rentalsService.listRentals();
        res.status(200).json(rentals);
    } catch (err) {
        next(err);
    }
}

async function postRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    if (!customerId || !gameId || !daysRented || daysRented <= 0) {
        return next(badRequestError('Campos customerId, gameId e daysRented são obrigatórios e daysRented deve ser maior que zero.'));
    }

    try {
        await rentalsService.createRental({ customerId, gameId, daysRented });
        res.status(201).send();
    } catch (err) {
        next(err);
    }
}

async function postRentalReturn(req, res, next) {
    try {
        const id = validateId(req.params.id);

        await rentalsService.finalizeRental(id);
        res.status(200).send();
    } catch (err) {
        next(err);
    }
}

async function deleteRental(req, res, next) {
    try {
        const id = validateId(req.params.id);

        await rentalsService.removeRental(id);
        res.status(200).send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getRentals,
    postRental,
    postRentalReturn,
    deleteRental
};