// src/controllers/rentals.controller.js

const rentalsService = require('../services/rentals.service');
// Certifique-se de que badRequestError e outras customErrors estão disponíveis
const { badRequestError } = require('../errors/customErrors');

/**
 * Função utilitária para validar e converter o ID do parâmetro para inteiro.
 * @param {string} id - ID recebido da requisição (req.params.id).
 * @returns {number} O ID validado como número inteiro.
 * @throws {badRequestError} Se o ID for inválido ou não for um número positivo.
 */
const validateId = (id) => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId <= 0) {
        throw badRequestError('ID inválido. Deve ser um número inteiro positivo.');
    }
    return parsedId;
};

// --- Funções do Controller ---

/**
 * [GET /rentals] Lista todos os aluguéis.
 */
async function getRentals(req, res, next) {
    try {
        const rentals = await rentalsService.listRentals();
        // Não é necessário 'return' se não há código após a resposta.
        res.status(200).json(rentals);
    } catch (err) {
        // CORREÇÃO: Usar 'return' aqui garante que o fluxo pare no erro.
        return next(err);
    }
}

/**
 * [POST /rentals] Cria um novo aluguel.
 */
async function postRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    // Validação básica de campos obrigatórios
    if (!customerId || !gameId || !daysRented || daysRented <= 0) {
        return next(badRequestError('Campos customerId, gameId e daysRented são obrigatórios e daysRented deve ser maior que zero.'));
    }

    try {
        await rentalsService.createRental({ customerId, gameId, daysRented });
        res.status(201).send();
    } catch (err) {
        // CORREÇÃO: Usar 'return' aqui garante que o fluxo pare no erro.
        return next(err);
    }
}

/**
 * [POST /rentals/:id/return] Finaliza o aluguel e calcula a multa.
 */
async function postRentalReturn(req, res, next) {
    try {
        // O validateId lança um erro, que é capturado pelo catch se for inválido.
        const id = validateId(req.params.id);

        await rentalsService.finalizeRental(id);
        res.status(200).send();
    } catch (err) {
        // CORREÇÃO: Usar 'return' aqui garante que o fluxo pare no erro.
        return next(err);
    }
}

/**
 * [DELETE /rentals/:id] Deleta um aluguel (assumindo que a regra de negócio permite).
 */
async function deleteRental(req, res, next) {
    try {
        const id = validateId(req.params.id);

        await rentalsService.removeRental(id);
        res.status(200).send();
    } catch (err) {
        // CORREÇÃO: Usar 'return' aqui garante que o fluxo pare no erro.
        return next(err);
    }
}

module.exports = {
    getRentals,
    postRental,
    postRentalReturn,
    deleteRental
};