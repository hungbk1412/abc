const express = require('express');
const router = express.Router();

const managerController = require('../controllers/manager');
const isAuthMiddleware = require('../middleware/isAuth');

router.post('/new-user', managerController.postNewUser);
router.post('/edit-user', managerController.editUser)

router.post('/new-employee', managerController.postEmployee);
router.post('/edit-employee', managerController.editEmployee);

router.post('/new-product-type', managerController.postProductType);
router.post('/delete-product-type', managerController.deleteProductType);
router.post('/new-product', managerController.postProduct);
router.post('/edit-product', managerController.editProduct);
router.post('/delete-product', managerController.deleteProduct);

router.get('/get-product-sold/:date', managerController.getProductsSold);
router.get('/get-final-bill/:date', managerController.getBills);

router.post('/new-time-keeping', managerController.postTimeKeeping);
router.post('/get-time-keeping', managerController.getTimeKeeping);

module.exports = router;