const { models: { Recipe, Photo } } = require("../models");

module.exports = {
    
    create: async (req, res) => {
        const recipe_id = await Recipe.findOne({
            where: {
                id: req.body.recipe_id
            }
        });
        if (recipe_id == null) {
            res.send("recipe doesn't exist");
        }
        else {
            if (req.body.photo_path != null) {
                try {
                    await Photo.create({
                        photo_path: req.body.photo_path,
                        recipe_id: recipe.id
                    });
                }
                catch (error) { res.send("Validation Error in Photos"); }
            }
        }
    }
}