const routes = require('express').Router();
const gamesController = require('../controllers/game.js');


// Added validation for L06
const validation = require('../middleware/validate');

// Retrieve all published Games
routes.get('/games', gamesController.getAllGames);

// Retrieve a single Game with id
routes.get('/games/:id', gamesController.getSingleGame);
// routes.get('/games/:game_id', gamesController.getSingleGame);

// Create a new Game
routes.post('/games', validation.saveGame, gamesController.createGame);

// Update a Game with id
routes.put('/games/:id', validation.saveGame, gamesController.updateGame);

// Delete a Game with id
routes.delete('/games/:id', gamesController.deleteGame);


module.exports = routes;