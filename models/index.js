const dbConfig = require('../config/db-config');
const Sequelize = require('sequelize');
const { applyExtraSetup } = require('./associations_setup');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, { // Give first the name, the user and password to connect to the db
    host: dbConfig.HOST, // pass the post name of the db, since its on my computer its localhost
    dialect: dbConfig.DIALECT // pass the dialect
});

const db = {};
db.sequelize = sequelize; // We add the sequelize instance 
db.models = {}; // We add all the models ( tables ) our db has
db.models.User = require('./user')(sequelize, Sequelize.DataTypes); // db.models.User represents the user table 
// it will export a function that takes the arguments: sequelize and Datatypes
db.models.Recipe = require('./recipe')(sequelize, Sequelize.DataTypes); // Do the samething for Recipe
db.models.Photo = require('./photo')(sequelize, Sequelize.DataTypes);

applyExtraSetup(db); // Applies associations 

module.exports = db;