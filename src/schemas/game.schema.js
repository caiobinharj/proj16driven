const Joi = require('joi');

const gameSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'O campo nome não pode ser vazio.',
        'any.required': 'O campo nome é obrigatório.',
    }),

    image: Joi.string().allow('').optional(),

    stockTotal: Joi.number().integer().min(1).required().messages({
        'number.base': 'stockTotal deve ser um número.',
        'number.min': 'stockTotal deve ser maior que 0.',
        'any.required': 'O campo stockTotal é obrigatório.',
    }),

    pricePerDay: Joi.number().integer().min(1).required().messages({
        'number.base': 'pricePerDay deve ser um número.',
        'number.min': 'pricePerDay deve ser maior que 0.',
        'any.required': 'O campo pricePerDay é obrigatório.',
    }),
});

module.exports = gameSchema;