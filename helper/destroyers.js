const { models: { Recipe, User, Photo, Rating } } = require("../models");
const photo = require("../models/photo");

async function destroyPhoto(photo) {
    if (photo) {
        await photo.destroy();
        return true;
    }
    return false;
}

async function destroyRating(rating) {
    if (rating) {
        await rating.destroy();
        return true;
    }
    return false;
}

async function destroyRecipe(recipe) {
    if (recipe) {
        const ratings = await Rating.findAll({ where: { recipe_id: recipe.id } });
        for (const rating of ratings)
            destroyRating(rating);
        const photos = await Photo.findAll({ where: { recipe_id: recipe.id } });
        for (const photo of photos)
            destroyRating(photo);
        await recipe.destroy();
        return true;
    }
    return false;
}

async function destroyUser(user) {
    if (user) {
        const recipes = await Recipe.findAll({ where: { user_id: user.id } });
        for (const recipe of recipes)
            destroyRecipe(recipe);
        const ratings = await Rating.findAll({ where: { user_id: user.id } });
        for (const rating of ratings)
            destroyRating(rating);
        await user.destroy();
        return true;
    }
    return false;
}

module.exports = { destroyPhoto, destroyRating, destroyRecipe, destroyUser };