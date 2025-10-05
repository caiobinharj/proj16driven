const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentals.controller');

router.get('/', rentalsController.getRentals);

router.post('/', rentalsController.postRental);

router.post('/:id/return', rentalsController.postRentalReturn);

router.delete('/:id', rentalsController.deleteRental);

module.exports = router;