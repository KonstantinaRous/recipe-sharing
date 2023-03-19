var express = require('express');
var router = express.Router();
const { user } = require('../controllers');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  const ipAddress = req.socket.remoteAddress;
  console.log(ipAddress);
});

router.get('/new_user', user.getUsers);

router.post('/new_user', user.create);


module.exports = router;
