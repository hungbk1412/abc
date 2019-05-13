const express = require("express");
const router = express.Router();

const orderController = require('../controllers/order');
const authMiddleware = require('../middleware/isAuth');

router.get("/products", orderController.getProducts);

router.get("/product-type", orderController.getProductType);

router.get('/kitchen', authMiddleware.isRole2, orderController.barGetTempOrder);

router.post('/new-temp-order', orderController.postNewTempOrder);

router.post('/get-temp-order', orderController.tableGetTempOrder);

router.post('/update-status-instock', orderController.postStatusInStock);

router.post('/create-bill', orderController.createBill);

router.post('/kitchen-check-item', orderController.checkItemDone);

module.exports = router;