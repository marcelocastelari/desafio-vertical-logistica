const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.post('/process-file', upload.single('data'), orderController.uploadFile)
router.get('/orders', orderController.getOrders)
router.get('/orders/id/:id', orderController.getOrdersById)
router.get('/orders/range', orderController.getOrdersByDataRange)

module.exports = router;