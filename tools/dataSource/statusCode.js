const language = 'chn'; // chn / env
const successCode = 200;
const errorCode = 500;
const statusCode = {
  [successCode]: { message: '成功', desc: 'Success' },
  [errorCode]: { message: '未知错误', desc: 'Unknown error' },
  2: { message: '服务暂不可用', desc: 'Service temporarily unavailable' },
  3: { message: '未知的方法', desc: 'Unsupported openapi method' },
  4: { message: '接口调用次数已达到设定的上限', desc: 'Open api request limit reached' },
  5: { message: '请求来自未经授权的IP地址', desc: 'Unauthorized client IP address' },
  6: { message: '无权限访问该用户数据', desc: 'No permission to access user data' },
  7: { message: '来自该refer的请求无访问权限', desc: 'No permission to access data for this referer' },
  100: { message: '请求参数无效', desc: 'Invalid parameter' },
  101: { message: 'api key无效', desc: 'Invalid API key' },
  104: { message: '无效签名', desc: 'Incorrect signature' },
  105: { message: '请求参数过多', desc: 'Too many parameters' },
  106: { message: '未知的签名方法', desc: 'Unsupported signature method' },
  107: { message: 'timestamp参数无效', desc: 'Invalid/Used timestamp parameter' },
  109: { message: '无效的用户资料字段名', desc: 'Invalid user info field' },
  110: { message: '无效的access token', desc: 'Access token invalid or no longer valid' },
  111: { message: 'access token过期', desc: 'Access token expired' },
  210: { message: '用户不可见', desc: 'User not visible' },
  211: { message: '获取未授权的字段', desc: 'Unsupported permission' },
  212: { message: '没有权限获取用户的email', desc: 'No permission to access user email' },
  800: { message: '未知的存储操作错误', desc: 'Unknown data store API error' },
  801: { message: '无效的操作方法', desc: 'Invalid operation' },
  802: { message: '数据存储空间已超过设定的上限', desc: 'Data store allowable quota was exceeded' },
  803: { message: '指定的对象不存在', desc: 'Specified object cannot be found' },
  804: { message: '指定的对象已存在', desc: 'Specified object already exists' },
  805: { message: '数据库操作出错，请重试', desc: 'A database error occurred. Please try again' },
  806: { message: '指定的路径不存在', desc: 'Specified router cannot be found' },
  900: { message: '访问的应用不存在', desc: 'No such application exists' },
};

const getStatusCode = (code = 1) => {
  const field = language === 'chn' ? 'message' : 'desc';
  const _code = statusCode[code] || statusCode[1];
  return _code[field];
};

module.exports = {
  getStatusCode,
  successCode,
  errorCode,
};
