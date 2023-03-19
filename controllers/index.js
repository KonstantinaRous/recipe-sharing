const controllers = {};

controllers.user = require('./user');
controllers.photo = require('./photo');
controllers.recipe = require('./recipe');

module.exports = controllers;