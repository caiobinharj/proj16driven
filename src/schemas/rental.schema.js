// src/schemas/rental.schema.js
const Joi = require('joi');

const rentalSchema = Joi.object({
    customerId: Joi.number().integer().positive().required().messages({
        'number.base': 'O customerId deve ser um número.',
        'number.positive': 'O customerId deve ser positivo.',
        'any.required': 'O campo customerId é obrigatório.'
    }),

    gameId: Joi.number().integer().positive().required().messages({
        'number.base': 'O gameId deve ser um número.',
        'number.positive': 'O gameId deve ser positivo.',
        'any.required': 'O campo gameId é obrigatório.'
    }),

    daysRented: Joi.number().integer().min(1).required().messages({
        'number.base': 'O daysRented deve ser um número.',
        'number.min': 'O daysRented deve ser maior que zero.',
        'any.required': 'O campo daysRented é obrigatório.'
    }),
});

module.exports = rentalSchema;