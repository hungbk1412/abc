const express = require('express');
const router = express.Router();

const managerController = require('../controllers/manager');
const isAuthMiddleware = require('../middleware/isAuth');

router.post('/new-user', managerController.postNewUser);

router.post('/new-product-type', managerController.postProductType);

router.post('/new-product', managerController.postProduct);

module.exports = router;