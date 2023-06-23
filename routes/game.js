const routes = require('express').Router();
const games = require('../controllers/game.js');
// console.log erase
console.log("game.js here");

// Retrieve all published Games
routes.get('/games', games.findAll);

// Retrieve a single Game with id
routes.get('/games/:game_id', games.findOne);

// Create a new Game
routes.post('/games', games.create);

// Update a Game with id
// routes.put('/:id', games.update);

// Delete a Game with id
// routes.delete('/:id', games.delete);

// Delete all Games
// routes.delete('/', games.deleteAll);

module.exports = routes;