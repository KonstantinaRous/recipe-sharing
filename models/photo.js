module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('photo', {
        photo_path: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true, notNull: true },
            unique: true
        }
    },
        { freezeTableName: true });
    return Photo;
} 