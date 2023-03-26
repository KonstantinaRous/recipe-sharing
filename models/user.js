module.exports = (sequelize, DataTypes) => { // The sequelize and Datatypes will come when we require the user.js in index.js
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric:{
                    args: true,
                    msg: "Password must be Alphanumeric"
                },
                len: {
                    args: [8, 32],
                    msg: "Password must be 8-32 characters long"
                },
                notEmpty: true,
                notNull: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notNull: true
            },
            unique: true
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notNull: true
            }
        },
    },
        {
            freezeTableName: true
        });
    return User;
};
