const express = require('express');

const router = express.Router();
const { userLogin, getUserLinks, shortenUrl } = require('../controllers');

router.get('/:userName', getUserLinks);

router.post('/loginUser', userLogin);

router.post('/addUrl', shortenUrl);

module.exports = router;
