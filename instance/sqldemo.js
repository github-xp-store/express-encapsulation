// 新增
var str = sqlJoin(
     {type: 'INSERT', prop: {mNum: 7570, mName: '晓鑫', points: 14}},
     'members',
     {limit: true, num: 1}
 );
 console.log(str);
 //INSERT INTO members(`mNum`, `mName`, `points`) VALUES ('7570','晓鑫', '14')
// 删除
var str = sqlJoin(
     {type: 'DELETE'},
     'members',
     {where: true, whereProp: [{mId: 67}]},
     {limit: true, num: 1}
 );
 console.log(str);
 //DELETE FROM members WHERE `mId`='67' LIMIT 1
// 修改
var str = sqlJoin(
    {type: 'UPDATE', prop: {points: 14}},
    'members',
    {where: true, whereProp: [{mId: 24}]},
    {limit: true, num: 1}
);
console.log(str);
//UPDATE members SET `points` ='14' WHERE `mId`='24' LIMIT 1
// 查询—— %
var str = sqlJoin(
     {type: 'SELECT'},
     'members',
     {where: true, likeProp: {mNum: 75, mName: '刘', points: 12}},
     {limit: false, num: 1}
 );
 console.log(str);
 //SELECT  * FROM `members` WHERE mNum LIKE '%75%' AND mName LIKE '%刘%' AND points LIKE '%12%'
// 查询—— % + AND/OR
var str = sqlJoin(
     {type: 'SELECT'},
     'members',
     {where: true, whereProp: [{'mNum': 7501, operator: '='},'OR', {mName: '刘想',operator: '='}, 'AND',{points: 5, operator: '>'}]},
     {limit: false, num: 1}
 );
 console.log(str);
 //SELECT  * FROM `members` WHERE `mNum`='7501' OR `mName`='刘想'
// 查询—— % + AND+OR
var str = sqlJoin(
    {type: 'SELECT'},
    'members',
    {where: true, whereProp: ['(', {'mNum': 7501, operator: '='},'OR', {mName: '刘想',operator: '='},')', 'AND',{points: 5, operator: '>'}]},
    {limit: false, num: 1}
);
console.log(str);
//SELECT * FROM `members` WHERE ( `mNum`='7501' OR `mName`='刘想' ) AND `points`>'5'
// 查询——DESC/ASC
// true: ASC,false: DESC
var str = sqlJoin(
    {type: 'SELECT', orderProp: {points:false}},
    'members'
);
console.log(str);
//SELECT  * FROM `members` ORDER BY points DESC
// 查询——WHERE
var str = sqlJoin(
    {type: 'SELECT', prop: ['mName','points','mNum'], orderProp: {points: true}},
    'members',
    {where: true, whereProp: [{mId: 2, operator: '>'}]}
);
console.log(str);
//SELECT `mName`,`points`,`mNum` FROM `members` WHERE `mId`='24'
// 查询——distinct
var str = sqlJoin(
    {type: 'SELECT', distinct: true, prop: ['points'], orderProp: {points: true}},
    'members',
    {where: true, whereProp: [{mId: 2, operator: '>'}]}
);
console.log(str);
//SELECT  DISTINCT `points` FROM `members` WHERE `mId`>'2' ORDER BY points ASC