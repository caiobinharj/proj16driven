const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers.controller');

router.get('/', customersController.getCustomers);

router.get('/:id', customersController.getCustomerById);

router.post('/', customersController.postCustomer);

module.exports = router;