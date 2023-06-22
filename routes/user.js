const routes = require('express').Router();
const users = require('../controllers/user.js');

// Retrieve all published Users
routes.get('/', users.findAll);

// Retrieve a single User with id
routes.get('/:user_id', users.findOne);

// Create a new User
routes.post('/', users.create);

// Update a User with id
// routes.put('/:id', users.update);

// Delete a USer with id
// routes.delete('/:id', users.delete);

// Delete all Users
// routes.delete('/', users.deleteAll);

module.exports = routes;