const rentalsRepository = require('../repositories/rentals.repository');
const gamesRepository = require('../repositories/games.repository');
const customersRepository = require('../repositories/customers.repository');
const {
    notFoundError,
    unprocessableEntityError,
    badRequestError
} = require('../errors/customErrors');

const dayjs = require('dayjs');

function formatRental(rental) {
    return {
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
        daysRented: rental.daysRented,
        returnDate: rental.returnDate ? dayjs(rental.returnDate).format('YYYY-MM-DD') : null,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
            id: rental.customerId,
            name: rental.customerName,
        },
        game: {
            id: rental.gameId,
            name: rental.gameName,
        },
    };
}

async function listRentals() {
    const rentals = await rentalsRepository.findAllRentals();
    return rentals.map(formatRental);
}

async function createRental({ customerId, gameId, daysRented }) {
    const customer = await customersRepository.findCustomerById(customerId);
    if (!customer) throw notFoundError('Cliente não encontrado.');

    const game = await gamesRepository.findGameById(gameId); // Assumindo que você criou findGameById
    if (!game) throw notFoundError('Jogo não encontrado.');

    const openRentals = await rentalsRepository.countOpenRentalsByGameId(gameId);
    if (openRentals >= game.stockTotal) {
        throw unprocessableEntityError('Jogo esgotado. Não há estoque disponível para aluguel.');
    }

    const rentDate = dayjs().format('YYYY-MM-DD');
    const originalPrice = daysRented * game.pricePerDay;

    await rentalsRepository.insertRental(customerId, gameId, rentDate, daysRented, originalPrice);
}

async function finalizeRental(id) {
    const rental = await rentalsRepository.findRentalById(id);

    if (!rental) throw notFoundError('Aluguel não encontrado.');

    if (rental.returnDate !== null) {
        throw unprocessableEntityError('Aluguel já finalizado.');
    }

    const returnDate = dayjs();
    const dueDate = dayjs(rental.rentDate).add(rental.daysRented, 'day');

    let delayFee = 0;

    if (returnDate.isAfter(dueDate, 'day')) {
        const game = await gamesRepository.findGameById(rental.gameId);
        const pricePerDay = game.pricePerDay;

        const daysDelayed = returnDate.diff(dueDate, 'day');
        delayFee = daysDelayed * pricePerDay;
    }

    await rentalsRepository.updateRentalReturn(id, returnDate.format('YYYY-MM-DD'), delayFee);
}

async function removeRental(id) {
    const rental = await rentalsRepository.findRentalById(id);

    if (!rental) throw notFoundError('Aluguel não encontrado.');

    if (rental.returnDate === null) {
        throw badRequestError('Não é possível deletar um aluguel em aberto.');
    }

    await rentalsRepository.deleteRental(id);
}

module.exports = {
    listRentals,
    createRental,
    finalizeRental,
    removeRental
};