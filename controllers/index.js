const controllers = {};

controllers.user = require('./user');
controllers.photo = require('./photo');
controllers.recipe = require('./recipe');
controllers.rating = require('./rating');

module.exports = controllers;