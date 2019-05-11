const express = require("express");
const router = express.Router();
const orderController = require('../controllers/order');

router.get("/products", orderController.getProducts);

router.get("/product-type", orderController.getProductType);

router.post('/update-status-instock', orderController.postStatusInStock)

module.exports = router;