const express = require('express');

const router = express.Router();
const { urlController } = require('../controllers');

router.get('/:shortUrl', urlController);

module.exports = router;
