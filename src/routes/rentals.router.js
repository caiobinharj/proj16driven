const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentals.controller');

router.get('/', rentalsController.getRentals);

router.post('/return/:id', rentalsController.postRentalReturn);

router.post('/', rentalsController.postRental);

router.delete('/:id', rentalsController.deleteRental);

module.exports = router;