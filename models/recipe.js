module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("recipe", {
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true, notNull: true }
        },
        ingrediants: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true , notNull: true}
        }, 
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false, 
            validate: { notEmpty: true , notNull: true}
        }
    },
        {
            freezeTableName: true
        });
    return Recipe;
}