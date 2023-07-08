const routes = require('express').Router();

console.log("server.js here");

routes.use('/', require('./swagger'));
routes.use('/games', require('./game.js'));
routes.use('/users', require('./user.js'));

module.exports = routes;