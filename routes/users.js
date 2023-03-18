var express = require('express');
var router = express.Router();
var { models: { User } } = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/new_user', function (req, res, next) {
  const ipAddress = req.socket.remoteAddress;
  console.log(ipAddress);
  res.send('Creating a new user');
});

router.post('/new_user', async function (req, res, next) {
  // Check if the username already exists in the database
  const name = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  // Check if the email already exists in the database
  const mail = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  // If both username and email are unique
  if (name == null && mail == null) {
    // Check if password only contains alphanumeric characters
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (alphanumericRegex.test(req.body.password)) {
      // Check if password length is between 8 and 32 characters
      const password_len = req.body.password.length
      if (password_len >= 8 && password_len <= 32) {
        // Checks for Validation Error, like the email not being in proper email format
        try {
          // Create new user in the database
          await User.create(req.body);
          // Return list of all users
          const list_of_all = await User.findAll();
          res.json(list_of_all);
        }
        catch (error) {
          res.send("Validation Error");
        }
      }
      else
        res.send("Password must be 8-32 characters long");
    }
    else {
      res.send("Password must only contain alphanumeric characters: A-Z,a-z,0-9")
    }
  }
  // If both username and email are not unique
  else if (!(name == null && mail == null))
    res.send("username and mail already in use");
  // If only username is not unique
  else if (name != null)
    res.send("username already in use");
  // If only email is not unique
  else if (mail != null)
    res.send("email already in use");
  // End the response
  res.end();
});


module.exports = router;
