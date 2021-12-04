const express = require('express');

const router = express.Router();
// var mysql = require('../method/mysql');
const redisMethod = require('./method');
const globalPara = require('../../tools/dataSource/global');

/* redis 公共模块 baseUrl 校验 */
router.post('*', (req, res, next) => {
  let result = false;
  for (const x in global.routerPath) {
    if (global.routerPath[x] === req.baseUrl) {
      result = true;
      break;
    }
  }
  if (!result) res.error(3);
  next();
});

/* redis 公共模块 token 校验 */
router.post('/', (req, res, next) => {
  globalPara.reset();
  // const a = req.body
  // req.body.token = '496276df53f76ea2fa0df7bae839456e'
  const token = req.body.token || '';
  if (!token) {
    /* 无效的access token */
    res.error(110);
  } else {
    redisMethod
      .keys(token, 1)
      .then((redisKey) => {
        if (redisKey) return redisMethod.get(redisKey);
        return Promise.reject(new Error('error'));
      })
      .then((val) => {
        global.tokeninfo = JSON.parse(val);
        next();
      })
      .catch(() => res.error(111));
  }
});

module.exports = router;
