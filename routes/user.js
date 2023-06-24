const routes = require('express').Router();
const users = require('../controllers/user.js');
// console.log erase
console.log("user.js here");

// Added validation for L06
const validation = require('../middleware/validate');

// Retrieve all published Users
routes.get('/users', users.findAll);

// Retrieve a single User with id
routes.get('/users/:user_id', users.findOne);

// Create a new User
routes.post('/users', validation.saveUser, users.create);

// Update a User with id
routes.put('/:id', validation.saveUser, users.update);

// Delete a USer with id
routes.delete('/:id', users.delete);

// Delete all Users
routes.delete('/', users.deleteAll);

module.exports = routes;