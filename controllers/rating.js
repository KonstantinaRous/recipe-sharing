const { models: { Rating, User, Recipe } } = require("../models");
const { ratingValidator, stringValidator } = require('../helper/validators');
const { destroyPhoto, destroyRating } = require("../helper/destroyers");

module.exports = {
    getRatings: async (req, res) => {
        const list_of_all = await Rating.findAll();
        res.json(list_of_all);
    },

    create: async (req, res) => {
        if (req.body.username) {
            const user = await User.findOne({ where: { username: req.body.username } });
            if (user) {
                if (req.body.recipe_id) {
                    const recipe = await Recipe.findOne({ where: { id: req.body.recipe_id } });
                    if (recipe) {
                        if (!(await Rating.findOne({ where: { user_id: user.id, recipe_id: recipe.id } }))) {
                            if (ratingValidator(req.body.rating)) {
                                let flag = 0;
                                if (req.body.comment) {
                                    if (req.body.comment.lenght == 0)
                                        flag = 0;
                                    else
                                        flag = 1;
                                }
                                if (flag) {
                                    await Rating.create({
                                        rating: req.body.rating,
                                        comment: req.body.comment,
                                        user_id: user.id,
                                        recipe_id: req.body.recipe_id
                                    });
                                }
                                else {
                                    await Rating.create({
                                        rating: req.body.rating,
                                        comment: null,
                                        user_id: user.id,
                                        recipe_id: req.body.recipe_id
                                    });
                                }
                                res.send("rating was created");
                            }
                            else
                                res.send("not a valid rating");
                        }
                        else
                            res.send("user already has a rating");
                    }
                    else
                        res.send("recipe doesn't exist");
                }
                else
                    res.send("recipe id must be provided");
            }
            else {
                res.send("user does't exist");
            }
        }
        else
            res.send("username must be provided");
    },

    updateRating: async (req, res) => {
        if (req.body.rating_id) {
            const rating = await Rating.findOne({ where: { id: req.body.rating_id } });
            if (rating) {
                if (ratingValidator(req.body.new_rating)) {
                    rating.rating = req.body.new_rating;
                    try {
                        rating.save();
                        res.send("rating has been updated");
                    }
                    catch {
                        res.send("rating failed to update");
                    }
                }
                else
                    res.send("not a valid rating");
            }
            else
                res.send("rating doesn't exist");
        }
        else
            res.send("rating id must be provided");
    },

    updateComment: async (req, res) => {
        if (req.body.rating_id) {
            const rating = await Rating.findOne({ where: { id: req.body.rating_id } });
            if (rating) {
                if (stringValidator(req.body.new_comment)) {
                    rating.comment = req.body.new_comment;
                    try {
                        rating.save();
                        res.send("comment has been updated");
                    }
                    catch {
                        res.send("comment failed to update");
                    }
                }
                else
                    res.send("not a valid comment");
            }
            else
                res.send("rating doesn't exist");
        }
        else
            res.send("rating id must be provided");
    },

    deleteRating: async (req, res) => {
        if (req.body.rating_id) {
            const rating = await Rating.findOne({ where: { id: req.body.rating_id } });
            // const flag =;
            if ( await destroyRating(rating))
                res.send("rating has been deleted");
            else
                res.send("rating doesn't exist");
        }
        else
            req.send("rating id must be ");
    }
}