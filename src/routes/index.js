const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.post('/process-file', upload.single('data'), orderController.uploadFile)
router.post('/list')

module.exports = router;