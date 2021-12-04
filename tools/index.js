const status = require('./dataSource/statusCode');

const { getStatusCode: getDesc, successCode, errorCode } = status;

// 定义简化send方法
const SEND = {
  success(data = null, message, code = successCode) {
    this.send(JSON.stringify({ code, data, message: message || getDesc(code) }));
  },
  successText(message, code = successCode) {
    this.send(JSON.stringify({ code, message: message || getDesc(code) }));
  },
  error(code = errorCode) {
    this.send(JSON.stringify({ code, message: getDesc(code) }));
  },
  errorText(message, code = errorCode) {
    this.send(JSON.stringify({ code, message: message || getDesc(code) }));
  },
  warning(code, data) {
    this.send(JSON.stringify({ code, data, message: getDesc(code) }));
  },
  custom(code, message, data) {
    this.send(JSON.stringify({ code, data, message }));
  },
};

const encapsulation = function (res) {
  res.success = SEND.success;
  res.successText = SEND.successText;
  res.error = SEND.error;
  res.errorText = SEND.errorText;
  res.warning = SEND.warning;
  res.custom = SEND.custom;
};

module.exports = {
  encapsulation,
};
