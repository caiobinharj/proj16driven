const db = require('../databases/database');

async function findAllCustomers() {
    const query = 'SELECT * FROM customers;';
    const result = await db.query(query);
    return result.rows;
}

async function findCustomerById(id) {
    const query = 'SELECT * FROM customers WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function findCustomerByCpf(cpf) {
    const query = 'SELECT * FROM customers WHERE cpf = $1;';
    const result = await db.query(query, [cpf]);
    return result.rows[0];
}

async function insertCustomer(name, phone, cpf) {
    const query = `
    INSERT INTO customers (name, phone, cpf) 
    VALUES ($1, $2, $3);
  `;
    await db.query(query, [name, phone, cpf]);
}



module.exports = {
    findAllCustomers,
    findCustomerById,
    findCustomerByCpf,
    insertCustomer,
};