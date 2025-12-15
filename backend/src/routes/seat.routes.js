const express = require('express');
const router = express.Router();
const {
  getAllSeats,
  getAvailableSeats,
} = require('../controllers/seat.controller');

router.get('/', getAllSeats);
router.get('/available', getAvailableSeats);

module.exports = router;
