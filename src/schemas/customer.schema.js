const Joi = require('joi');

const customerSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'O campo nome não pode ser vazio.',
        'any.required': 'O campo nome é obrigatório.',
    }),
    phone: Joi.string().length(11).messages({
        'string.length': 'O telefone deve ter 11 caracteres.',
    }).custom((value, helpers) => {
        if (value.length === 11) {
            return value;
        }
        if (value.length !== 10 && value.length !== 11) {
            return helpers.error('string.length');
        }
        if (!/^\d+$/.test(value)) {
            return helpers.error('string.numeric');
        }
        return value;
    }).required().messages({
        'any.required': 'O campo telefone é obrigatório.',
        'string.numeric': 'O telefone deve conter apenas números.',
    }),
    cpf: Joi.string().length(11).pattern(/^\d{11}$/).required().messages({
        'string.length': 'O CPF deve ter 11 caracteres.',
        'string.pattern.base': 'O CPF deve conter apenas números.',
        'any.required': 'O campo CPF é obrigatório.',
    }),
});

module.exports = customerSchema;