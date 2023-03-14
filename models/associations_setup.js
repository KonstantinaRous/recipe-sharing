const Sequelize = require('sequelize');

function applyExtraSetup(db) {
    const user = db.models.User;
    const recipe = db.models.Recipe;
    const photo = db.models.Photo;

    user.hasMany(recipe, {
        foreignKey: 'user_id'
    });
    recipe.belongsTo(user, {
        foreignKey: 'user_id'
    });

    recipe.hasMany(photo, {
        foreignKey: 'recipe_id',
        allowNull: true
    });
    photo.belongsTo(recipe, {
        foreignKey: 'recipe_id',
        allowNull: true
    });
}

module.exports = { applyExtraSetup };