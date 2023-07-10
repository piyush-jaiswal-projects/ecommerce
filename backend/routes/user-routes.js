const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/users/user-controllers')
const {verifyUser} = require('../middleware/verify-user')

router.post("/getUser", verifyUser, userControllers.getDetails);
router.post("/addToCart", verifyUser, userControllers.addToCart);
router.post("/addToWishlist", verifyUser, userControllers.addToWishlist);
router.post("/placeOrder", verifyUser, userControllers.placeOrder);
router.post("/getCart", verifyUser, userControllers.getCart);
router.post("/getWishlist", verifyUser, userControllers.getWishlist);
router.post("/removeFromCart", verifyUser, userControllers.removeFromCart);
router.post("/removeFromWishlist", verifyUser, userControllers.removeFromWishlist);
router.post("/placeOrders", verifyUser, userControllers.placeOrder);
router.post("/getAddresses", verifyUser, userControllers.getAddresses);
router.post("/addAddress", verifyUser, userControllers.setAddress);
router.post("/getOrders", verifyUser, userControllers.getOrders);
router.post("/cancelOrder", verifyUser, userControllers.cancelOrder);


module.exports = router;