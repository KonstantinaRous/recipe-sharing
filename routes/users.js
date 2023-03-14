var express = require('express');
var router = express.Router();
var { models: { User } } = require('../models');

async function create() {
  const username = 'Dave';
  const password = '1234';
  const email = 'test@gmail.com';
  // const birthday = new Date().getDate();
  // const temp = birthday.getDate();
  // const isoBd = birthday.toISOString();
  // console.log(`Current date: ${birthday}`);
  await User.create({
    username,
    password,
    email,
  });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  create();
  // const {username,password,email,date_of_birth} = {'Dave','1234','test@gmail.com','13/5/2012'};
});

module.exports = router;
