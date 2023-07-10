const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products/product-controllers')
const {verifyAdmin} = require('../middleware/verify-admin')

router.get("/getProducts", verifyAdmin, productControllers.getProducts);
router.post("/addProduct", verifyAdmin, productControllers.addProduct);
router.post("/getProductFromId", verifyAdmin, productControllers.getProductsFromId);

module.exports = router;