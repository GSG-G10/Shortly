const express = require('express');

const router = express.Router();
const urlRouter = require('./url');
const userRouter = require('./user');

router.use('/url', urlRouter);
router.use('/user', userRouter);

module.exports = router;
