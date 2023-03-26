module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("rating", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                max: 5,
                min: 1
            }
        },
        comment: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        freezeTableName: true
    });
    return Rating;
}