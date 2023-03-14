var express = require('express');
var router = express.Router();
var { models: { User } } = require('../models');


async function create() { //Creates a user
  const username = 'user10';
  const password = '1234';
  const email = 'test10@gmail.com';
  let date_of_birth = new Date();
  await User.create({
    username,
    password,
    email,
    date_of_birth,
  });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  create();
});

module.exports = router;
