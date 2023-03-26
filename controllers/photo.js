const { models: { Recipe, Photo } } = require("../models");
const { pathValidator } = require('../helper/validators');
const { destroyPhoto } = require('../helper/destroyers')


module.exports = {

    create: async (req, res) => {
        if (req.body.recipe_id) {
            const recipe = await Recipe.findOne({
                where: {
                    id: req.body.recipe_id
                }
            });
            if (recipe) {
                if (pathValidator(req.body.photo_path)) {
                    if (!(await Photo.findOne({ where: { photo_path: req.body.photo_path } }))) {
                        try {
                            await Photo.create({
                                photo_path: req.body.photo_path,
                                recipe_id: recipe.id
                            });
                            res.send("photo has been added");
                        }
                        catch (error) {
                            res.send("Validation Error in Photos");
                        }
                    }
                    else
                        res.send("the path is already in use");
                }
                else
                    res.send("not a valid path");
            }
            else
                res.send("recipe doesn't exist");
        }
        else
            res.send("recipe id must be provided");
    },

    updatePath: async (req, res) => {
        if (req.body.photo_id) {
            const photo = await Photo.findOne({ where: { id: req.body.photo_id } })
            if (photo) {
                if (pathValidator(req.body.new_path)) {
                    if (!(await Photo.findOne({ where: { photo_path: req.body.new_path } }))) {
                        photo.photo_path = req.body.new_path;
                        try {
                            photo.save();
                            res.send("path has been updated");
                        }
                        catch {
                            res.send("path failed to update");
                        }
                    }
                    else
                        res.send("the provided path is already used");
                }
                else
                    res.send("not a valid path");
            }
            else
                res.send("photo doesn't exist");
        }
        else
            req.send("photo id must be provided");
    },

    deletePhoto: async (req, res) => {
        if (req.body.photo_id) {
            const photo = await Photo.findOne({ where: { id: req.body.photo_id } })
            if (await destroyPhoto(photo))
                res.send("photo has been deleted");
            else
                res.send("photo doesn't exist");
        }
        else
            res.send("photo id must be provided");
    }
}