const { models: { Recipe, User, Photo } } = require("../models");

module.exports = {
    getRecipes: async (req, res) => {
        // Get a list of all recipes in the database, including the newly created one
        const list_of_all = await Recipe.findAll();
        // Send the list of all recipes as the response
        res.json(list_of_all);
    },

    create: async (req, res) => {
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
                if (req.body.photo_path != null) {
                    try {
                        await Photo.create({
                            photo_path: req.body.photo_path,
                            recipe_id: recipe.id
                        });
                    }
                    catch (error) { res.send("Validation Error in Photos"); }
                }
            } catch (error) {
                res.send("Validation Error in Recipes");
            }
        }
        res.end();
    }
}