const express = require('express');
const uploadController = require('../controllers/uploadController');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.post('/process-file', upload.single('data'), uploadController.uploadFile)
router.post('/list')

module.exports = router;