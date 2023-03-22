const Sequelize = require('sequelize');

function applyExtraSetup(db) {
    const user = db.models.User;
    const recipe = db.models.Recipe;
    const photo = db.models.Photo;
    const rating = db.models.Rating;

    user.hasMany(recipe, {
        foreignKey: {
            name: 'user_id',
            allowNull: false,
            validate: { notNull: true }
        }
    });
    recipe.belongsTo(user, {
        foreignKey: {
            name: 'user_id',
            allowNull: false,
            validate: { notNull: true }
        }
    });

    recipe.hasMany(photo, {
        foreignKey: {
            name: 'recipe_id',
            allowNull: false,
            validate: { notNull: true }
        }
    });
    photo.belongsTo(recipe, {
        foreignKey: {
            name: 'recipe_id',
            allowNull: false,
            validate: { notNull: true }
        }
    });

    recipe.hasMany(rating, {
        foreignKey: {
            name: 'recipe_id',
            allowNull: false,
            validate: { notNull: true }
        }
    });
    rating.belongsTo(recipe, {
        foreignKey: {
            name: 'recipe_id',
            allowNull: false,
            validate: { notNull: true }
        }
    });
    user.hasMany(rating, {
        foreignKey: {
            name: 'user_id',
            allowNull: false,
            validate: { notNull: true },
        }
    });
    rating.belongsTo(user, {
        foreignKey: {
            name: 'user_id',
            allowNull: false,
            validate: { notNull: true },
        }
    });
}

module.exports = { applyExtraSetup };