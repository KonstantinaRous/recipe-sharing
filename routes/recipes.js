var express = require('express');
var router = express.Router();
const { recipe } = require('../controllers');

router.get('/', function (req, res) {
    res.send('respond with a resource');
    const ipAddress = req.socket.remoteAddress;
    console.log(ipAddress);
});

router.get('/new_recipe', recipe.getRecipes);

// Create a new recipe and associate it with a user
router.post('/new_recipe',recipe.create);

module.exports = router;