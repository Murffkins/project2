const routes = require('express').Router();
const gamesController = require('../controllers/game.js');
// console.log erase
console.log("game.js here");

// Added validation for L06
const validation = require('../middleware/validate');

// Retrieve all published Games
routes.get('/games', gamesController.getAllGames);

// Retrieve a single Game with id
routes.get('/games/:game_id', gamesController.getSingleGame);

// Create a new Game
routes.post('/games', validation.saveGame, gamesController.createGame);

// Update a Game with id
routes.put('/:id', validation.saveGame, gamesController.updateGame);

// Delete a Game with id
routes.delete('/:id', gamesController.deleteGame);

// Erase
// // Delete all Games
// routes.delete('/', gamesController.deleteAll);

module.exports = routes;