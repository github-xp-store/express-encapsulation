const express = require('express');
// var app = express();
const router = express.Router();

const login = require('./login');
const redis = require('./redis');
const article = require('./article');

router.use('/login', login);
router.use('*', redis);
router.use('/article', article);

module.exports = router;
