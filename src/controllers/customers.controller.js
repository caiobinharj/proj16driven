const customersService = require('../services/customers.service');
const customerSchema = require('../schemas/customer.schema');
const { badRequestError } = require('../errors/customErrors');

async function getCustomers(req, res, next) {
    try {
        const customers = await customersService.listCustomers();
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
}

async function getCustomerById(req, res, next) {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) {
        return next(badRequestError('ID de cliente inválido.'));
    }

    try {
        const customer = await customersService.getCustomerById(id); // Lida com 404
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}

async function postCustomer(req, res, next) {
    const customerData = req.body;
    try {
        const { error } = customerSchema.validate(customerData);
        if (error) {
            throw badRequestError(error.details[0].message);
        }

        await customersService.createCustomer(customerData);
        res.status(201).send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCustomers,
    getCustomerById,
    postCustomer,
};