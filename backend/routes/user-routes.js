const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/users/user-controllers')

router.post("/getUser", userControllers.getDetails);
router.post("/addToCart", userControllers.addToCart);
router.post("/addToWishlist", userControllers.addToWishlist);
router.post("/placeOrder", userControllers.placeOrder);
router.post("/getCart", userControllers.getCart);
router.post("/getWishlist", userControllers.getWishlist);
router.post("/removeFromCart", userControllers.removeFromCart);
router.post("/removeFromWishlist", userControllers.removeFromWishlist);
router.post("/placeOrders", userControllers.placeOrder);


module.exports = router;