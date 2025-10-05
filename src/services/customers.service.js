const customersRepository = require('../repositories/customers.repository');
const { notFoundError, conflictError } = require('../errors/customErrors');

async function listCustomers() {
    return customersRepository.findAllCustomers();
}

async function getCustomerById(id) {
    const customer = await customersRepository.findCustomerById(id);

    if (!customer) {
        throw notFoundError('Cliente não encontrado.');
    }

    return customer;
}

async function createCustomer(customerData) {
    const { name, phone, cpf } = customerData;

    const existingCustomer = await customersRepository.findCustomerByCpf(cpf);
    if (existingCustomer) {
        throw conflictError('CPF já cadastrado.');
    }

    await customersRepository.insertCustomer(name, phone, cpf);
}

module.exports = {
    listCustomers,
    getCustomerById,
    createCustomer,
};