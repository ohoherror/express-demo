var express = require('express');
var router = express.Router();
//关联主程序
var userlist = require('../user/userlist.js');

//这个路由可以设置用户
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//增
router.post('/userAdd', function (req, res, next) {
  userlist.useradd(req, res, next);
});

//删
router.get('/userDelete', function (req, res, next) {
  userlist.userdelete(req, res, next);
});
//改
router.get('/userUpdate', function (req, res, next) {
  userlist.userupdate(req, res, next);
});

router.get('/userAll', function (req, res, next) {
  userlist.userall(req, res, next);
});


module.exports = router;
