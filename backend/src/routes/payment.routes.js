const express = require('express');
const router = express.Router();
const {
  makePayment,
  getStudentPayments,
} = require('../controllers/payment.controller');

router.post('/', makePayment);
router.get('/student/:studentId', getStudentPayments);

module.exports = router;
