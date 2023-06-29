const express = require('express');

const router = express.Router();
const authControllers = require('../controllers/users/auth-controllers')

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/otp", authControllers.otp);

module.exports = router;