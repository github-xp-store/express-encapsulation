var express = require('express');
var router = express.Router();
var mysql = require('./method/mysql');


router.post('/t', function(req, res, next) {
  var TSA = mysql.TSA;
  TSA.begin().then(function(con) {
    return TSA.course(con, 'UPDATE homedesc  SET lotname=1333 WHERE id=1;')
  }).then(function(con) {
    return TSA.course(con, 'UPDATE homedesc  SET lotname=1333 WHERE id=2;')
  }).then(function(con) {
    return TSA.finish(con)
  }).then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.send('error!');
  })
});

router.post('/test', function(req, res, next) {
  var sql = 'UPDATE homedesc  SET lotname=1234 WHERE id=1;select * from homedec  where id=2';
  mysql.ROW(sql).then(function(data) {
    res.send(JSON.stringify({
      status: 200,
      msg: '数据操作成功!',
      data: data,
    }));
  }).catch(function(data) {
    res.send(JSON.stringify({
      status: 500,
      msg: '数据操作异常,请稍后再试!',
      data: null,
    }))
  })
});

router.post('/savelist', function(req, res, next) {
  if (req.body.id) {
    var x = req.body;
    var sql = "UPDATE homedesc SET iconurl = '" + x.icon + "', lottype = '" + x.lottype + "', lotname = '" + x.lotname + "', type = '" + x.type + "', subhead = '" + x.subhead + "', substime = '" + x.substime + "', subetime = '" + x.subetime + "', subcolor = '" + x.subcolor + "', common = '" + x.common + "', comstime = '" + x.comstime + "', cometime = '" + x.cometime + "', comcolor = '" + x.comcolor + "', perfer = '" + x.perfer + "', perstime = '" + x.perstime + "', peretime = '" + x.peretime + "', percolor = '" + x.percolor + "' WHERE id = " + x.id;
  } else {
    var sql = ''
  }
  mysql.FIRST(sql).then(function(data) {
    res.send(JSON.stringify({
      status: 200,
      msg: '数据操作成功!',
      data: data,
    }));
  }).catch(function(data) {
    res.send(JSON.stringify({
      status: 500,
      msg: '数据操作异常,请稍后再试!',
      data: null,
    }))
  })
});

router.post('/checks', function(req, res, next) {
  var x = req.body;
  if (req.body.id) {
    var sql = mysql.SQLJOIN({
        type: 'UPDATE',
        prop: {
          iconurl: x.icon,
          lottype: x.lottype,
          lotname: x.lotname,
          type: x.type,
          subhead: x.subhead,
          substime: x.substime,
          subetime: x.subetime,
          subcolor: x.subcolor,
          common: x.common,
          comstime: x.comstime,
          cometime: x.cometime,
          comcolor: x.comcolor,
          perfer: x.perfer,
          perstime: x.perstime,
          peretime: x.peretime,
          percolor: x.percolor
        }
      },
      'homedesc', { where: true, whereProp: [{ id: x.id }] }, { limit: true, num: 1 }
    )
  } else {
    var sql = mysql.SQLJOIN({
        type: 'INSERT',
        prop: {
          iconurl: x.icon,
          lottype: x.lottype,
          lotname: x.lotname,
          type: x.type,
          subhead: x.subhead,
          substime: x.substime,
          subetime: x.subetime,
          subcolor: x.subcolor,
          common: x.common,
          comstime: x.comstime,
          cometime: x.cometime,
          comcolor: x.comcolor,
          perfer: x.perfer,
          perstime: x.perstime,
          peretime: x.peretime,
          percolor: x.percolor
        }
      },
      'homedesc', { limit: true, num: 1 }
    );
  }
  mysql.FIRST(sql).then(function(data) {
    res.send(JSON.stringify({
      status: 200,
      msg: '数据操作成功!',
      data: data,
    }));
  }).catch(function(data) {
    res.send(JSON.stringify({
      status: 500,
      msg: '数据操作异常,请稍后再试!',
      data: null,
    }))
  })

});

// router.get('/getUserInfo', function(req, res, next) {
//   var user = new User();
//   var params = URL.parse(req.url, true).query;
//   if (params.id == '1') {
//     user.name = "ligh";
//     user.age = "1";
//     user.city = "北京市";
//   } else {
//     user.name = "SPTING";
//     user.age = "1";
//     user.city = "杭州市";
//   }
//   var response = { status: 1, data: user };
//   res.send(JSON.stringify(response));
// });

module.exports = router;