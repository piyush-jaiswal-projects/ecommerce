const express = require('express');
const { checkout, paymentVerfication } = require('../controllers/payments/payment-controllers');
const router = express.Router();

router.post("/checkout",  checkout);
router.post("/verification", paymentVerfication);

module.exports = router;