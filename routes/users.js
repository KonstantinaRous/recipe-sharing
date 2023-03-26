var express = require('express');
var router = express.Router();
const { user } = require('../controllers');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  const ipAddress = req.socket.remoteAddress;
  console.log(ipAddress);
});

router.get('/get_users', user.getUsers);

router.post('/new_user', user.create);

router.put('/change_username', user.update_username);

router.put('/change_email', user.update_email);

router.put('/change_password', user.update_password);

router.put('/change_birthdate', user.updateDateOfBirth);

router.delete('/delete_user', user.deleteUser);

module.exports = router;
