const express = require("express");
const router = express.Router();

const orderController = require('../controllers/order');
const authMiddleware = require('../middleware/isAuth');

// ALL
router.get("/products", orderController.getProducts);
router.get("/product-type", orderController.getProductType);

// Tai ban
router.post('/new-temp-order', orderController.postNewTempOrder);
router.post('/get-temp-order', orderController.tableGetTempOrder);
router.post('/create-bill', orderController.createBill);
router.post('/delete-temp-order', orderController.deleteTempOrder);

// Tai nha bep
router.post('/update-status-instock', orderController.postStatusInStock);
router.post('/kitchen-check-item', orderController.checkItemDone);
router.get('/kitchen', authMiddleware.isRole2, orderController.barGetTempOrder);

// Tai quay thu ngan
router.get('/cashier-get-bills', orderController.cashierGetBills);
router.post('/checkout', orderController.checkout)

module.exports = router;