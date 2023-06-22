const routes = require('express').Router();
const games = require('../controllers/game.js');

// Retrieve all published Games
routes.get('/', games.findAll);

// Retrieve a single Game with id
routes.get('/:game_id', games.findOne);

// Create a new Game
routes.post('/', games.create);

// Update a Game with id
// routes.put('/:id', games.update);

// Delete a Game with id
// routes.delete('/:id', games.delete);

// Delete all Games
// routes.delete('/', games.deleteAll);

module.exports = routes;