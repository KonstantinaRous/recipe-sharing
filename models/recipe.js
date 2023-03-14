module.exports = (sequelize,DataTypes) => {
    const Recipe = sequelize.define("recipe", {
        recipe_name: {
            type: DataTypes.STRING,
            allowNULL: false,
            validate: { isEmpty: false }
        },
        ingrediants: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { isEmpty: false }
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { isEmpty: false }
        }
    },
    {
        freezeTableName: true
    });
    return Recipe;
}