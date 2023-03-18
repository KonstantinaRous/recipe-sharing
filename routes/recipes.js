var express = require('express');
var router = express.Router();
var { models: { Recipe, User, Photo } } = require('../models');

router.get('/', function (req, res) {
    res.send('respond with a resource');
    // create();
});

router.get('/new_recipe', function (req, res) {
    const ipAddress = req.socket.remoteAddress;
    console.log(ipAddress);
    res.send('Creating a new Recipe');
});

// Create a new recipe and associate it with a user
router.post('/new_recipe', async function (req, res) {
    // Look up the user associated with the recipe
    const user = await User.findOne({
        where: {
            id: req.body.user_id
        }
    });
    // If the user doesn't exist, return an error message
    if (user == null)
        res.send('User doesnt exist');
    // If the user exists, create the recipe and associate it with the user
    else {
        try {
            // Create the new recipe with the given name, ingredients, instructions, and user ID
            const recipe = await Recipe.create({
                recipe_name: req.body.recipe_name,
                ingrediants: req.body.ingrediants,
                instructions: req.body.instructions,
                user_id: req.body.user_id
            });
            try {
                // If a photo path was provided, create a new photo associated with the recipe
                if (req.body.photo_path != null) {
                    await Photo.create({
                        photo_path: req.body.photo_path,
                        recipe_id: recipe.id
                    });
                }
                // Get a list of all recipes in the database, including the newly created one
                const list_of_all = await Recipe.findAll();
                // Send the list of all recipes as the response
                res.json(list_of_all);
            } catch (error) {
                req.send("Validation Error in Photo")
            }
        } catch (error) {
            res.send("Validation Error in Recipes");
        }
    }
    res.end();
});

module.exports = router;