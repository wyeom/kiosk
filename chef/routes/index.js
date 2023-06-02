var express = require('express');
var router = express.Router();
var session = require('./session-manager');
var order  = require('./order-manager');

router.get('/', function(req, res) {
  res.render('index2',{title:'Exp'})
});
// router.get('/2', function(req, res) {
//   res.render('index2',{title:'Exp'})
// });

router.post('/emit', function(req, res) {
  let data = req.body
  console.log("emit data",data)
  session.manager().emitTo(data)
  res.send(data)
});

router.post('/disconnect', function(req, res) {
  let info = req.body
  console.log(info)
  session.manager().disconnect(info.id)
  res.send(info)
});

router.get('/list/allSocket', async function(req, res) {
  let result =  await session.manager().listAllSockets();
  res.send(result)
});

router.get('/list/users', async function(req, res) {
  res.send(session.manager().listUserIds());
});
router.get('/list/sockets', async function(req, res) {
  res.send(session.manager().listSocketIds());
});

router.get('/list/order/:userId', async function(req, res) {
  res.send(order.manager().listOrderByUserId(req.params.userId));
});
router.get('/list/lsitAllOrder', function(req, res) {
  res.send(order.manager().lsitAllOrder());
});

router.post('/order/doneThis', async function(req, res) {
  let userId = req.body.userId;
  let trans  = req.body.trans;
  let status = req.body.status
  let item = order.manager().changeStatus(userId,trans,status)
  session.manager().emitToUser(userId,'done-back',item)
  res.send(item);
});

module.exports = router;
