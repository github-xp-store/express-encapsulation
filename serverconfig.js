const hostname = '';
const port = 3000;
const mysqlConfig = {
  connectionLimit: 50,
  //   host: '192.168.1.248',
  //   user: 'root',
  //   password: 'root20180122',
  //   database: 'jiancai',

  // host: '192.168.1.200',
  // user: 'root',
  // password: 'root123456ROOT&',
  // database: 'bingo',
  //
  // host: 'rm-wz90k0c907765yk00zo.mysql.rds.aliyuncs.com',
  // user: 'root',
  // password: 'Nemoyr69',
  // database: 'async',+k

  // history
  // host: 'localhost',
  // user: 'root',
  // password: 'Nemoyr69@',
  // database: 'film',

  // company-localhost
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'temp_user',

  typeCast: true, // 是否把结果值转换为原生的 javascript 类型
  multipleStatements: true, // 是否允许执行多条sql语句
  waitForConnections: true,
};

module.exports = {
  HOSTNAME: hostname,
  PORT: port,
  MYSQLCONFIG: mysqlConfig,
};
