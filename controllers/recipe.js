const { models: { Recipe, User, Photo, Rating } } = require("../models");
const { stringValidator, pathValidator } = require('../helper/validators');
const { destroyRecipe } = require('../helper/destroyers')

module.exports = {
    getRecipes: async (req, res) => {
        // Get a list of all recipes in the database, including the newly created one
        const list_of_all = await Recipe.findAll();
        // Send the list of all recipes as the response
        res.json(list_of_all);
    },

    create: async (req, res) => {
        if (req.body.user_id) {
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
                if (stringValidator(req.body.recipe_name)) {
                    if (stringValidator(req.body.instructions)) {
                        if (stringValidator(req.body.ingrediants)) {
                            try {
                                // Create the new recipe with the given name, ingredients, instructions, and user ID
                                const recipe = await Recipe.create({
                                    recipe_name: req.body.recipe_name,
                                    ingrediants: req.body.ingrediants,
                                    instructions: req.body.instructions,
                                    user_id: req.body.user_id
                                });
                                if (pathValidator(req.body.photo_path)) {
                                    if (!(await Photo.findOne({ where: { photo_path: req.body.photo_path } }))) {
                                        try {
                                            await Photo.create({
                                                photo_path: req.body.photo_path,
                                                recipe_id: recipe.id
                                            });
                                        }
                                        catch (error) { res.send("Validation Error in Photos"); }
                                    }
                                    else
                                        res.send("path is already used");
                                }
                            } catch (error) {
                                res.send("Validation Error in Recipes");
                            }
                        }
                        else
                            res.send("invalid ingredients");
                    }
                    else
                        res.send("invalid instructions");
                }
                else
                    res.send("invalid recipe name");
            }
        }
        else
            res.send("user_id must be provided");
        res.end();
    },

    updateRecipeName: async (req, res) => {
        if (req.body.recipe_id) {
            const recipe = await Recipe.findOne({ where: { id: req.body.recipe_id } })
            if (recipe) {
                if (stringValidator(req.body.new_recipe_name)) {
                    recipe.recipe_name = req.body.new_recipe_name;
                    try {
                        await recipe.save();
                        res.send("recipe name has been updated");
                    }
                    catch {
                        res.send("recipe name update has failed");
                    }
                }
                else
                    res.send("invalid recipe name");
            }
            else
                res.send("recipe doesn't exist")
        }
        else
            res.send("recipe id must be provided");
    },
    updateInstructions: async (req, res) => {
        if (req.body.recipe_id) {
            const recipe = await Recipe.findOne({ where: { id: req.body.recipe_id } })
            if (recipe) {
                if (stringValidator(req.body.new_instructions)) {
                    recipe.instructions = req.body.new_instructions;
                    try {
                        await recipe.save();
                        res.send("instructions have been updated");
                    }
                    catch {
                        res.send("instructions update has failed");
                    }
                }
                else
                    res.send("invalid instructions");
            }
            else
                res.send("recipe doesn't exist");
        }
        else
            res.send("recipe id has been provided");
    },
    updateIngredients: async (req, res) => {
        if (req.body.recipe_id) {
            const recipe = await Recipe.findOne({ where: { id: req.body.recipe_id } })
            if (recipe) {
                if (stringValidator(req.body.new_ingredients)) {
                    recipe.ingrediants = req.body.new_ingredients;
                    try {
                        await recipe.save();
                        res.send("ingredients have been updated");
                    }
                    catch {
                        res.send("ingredients update has failed");
                    }
                }
                else
                    res.send("invalid ingredients");
            }
            else
                res.send("recipe doesn't exist");
        }
        else
            res.send("recipe id must be provided");
    },

    deleteRecipe: async (req, res) => {
        if (req.body.recipe_id) {
            const recipe = await Recipe.findOne({ where: { id: req.body.recipe_id } });
            if (await destroyRecipe(recipe))
                res.send("recipe has been destroyed");
            else
                res.send("recipe doesn't exist");
        }
        else
            res.send("recipe id must be provided");
    }
}