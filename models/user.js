module.exports = (sequelize, DataTypes) => { // The sequelize and Datatypes will come when we require the user.js in index.js
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
            unique: true
        },
        // date_of_birth: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        //     validate: { isDate: true }
        // },
    },
    {
        freezeTableName: true
    });
    return User;
};
