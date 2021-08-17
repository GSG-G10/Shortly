const express = require('express');
const { join } = require('path');
const router = require('./router');

const app = express();

app.use(express.static(join(__dirname, '..', 'public')));

app.set('port', process.env.PORT || 4000);

app.use(router);

module.exports = app;
