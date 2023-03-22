var express = require('express');
var router = express.Router();
const { recipe , photo} = require('../controllers');

router.get('/', function (req, res) {
    res.send('respond with a resource');
    const ipAddress = req.socket.remoteAddress;
    console.log(ipAddress);  
});

router.get('/new_recipe', recipe.getRecipes);

// Create a new recipe and associate it with a user
router.post('/new_recipe', recipe.create);

router.put('/update_recipe_name', recipe.updateRecipeName);

router.put('/update_instructions', recipe.updateInstructions);

router.put('/update_ingredients', recipe.updateIngredients);

router.post('/new_photo',photo.create);

router.put('/update_photo_path',photo.updatePath);

router.delete('/delete_photo',photo.deletePhoto);

router.delete(('/delete_recipe'), recipe.deleteRecipe);

module.exports = router;