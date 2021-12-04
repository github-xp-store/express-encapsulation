const crypto = require('crypto');
const cryptoKey = require('../dataSource/cryptoKey');

const randomString = function (len) {
  const l = len || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */ const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < l; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
const decompile = function (val) {
  if (!val) return null;
  const decodeData = crypto.privateDecrypt(cryptoKey.prikey, Buffer.from(val.toString('base64'), 'base64'));
  return decodeData.toString();
};
const encryption = function (secret, salt) {
  if (!secret || !salt) return null;
  return crypto.createHmac('sha256', secret).update(salt).digest('hex');
};

const encryptMD5 = function () {
  const content = this.randomString(5);
  return crypto.createHash('md5').update(content).digest('hex');
};
// 模块导出
module.exports = {
  randomString,
  decompile,
  encryption,
  encryptMD5,
};
