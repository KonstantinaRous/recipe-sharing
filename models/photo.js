module.exports = (sequelize, Datatypes) => {
    const Photo = sequelize.define('photo',
        {
            photo_path: {
                type: Datatypes.STRING,
                allowNULL: false,
                validate: { isEmpty: false }
            }
        },
        { freezeTableName: true });
    return Photo;
}