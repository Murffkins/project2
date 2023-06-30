const routes = require('express').Router();
const usersController = require('../controllers/user.js');
// console.log erase
console.log("user.js here");

// Added validation for L06
const validation = require('../middleware/validate');

// Retrieve all published Users
routes.get('/users', usersController.getAllUsers);

// Retrieve a single User with id
routes.get('/users/:user_id', usersController.getSingleUser);

// Create a new User
routes.post('/users', validation.saveUser, usersController.createUser);

// Update a User with id
routes.put('/:id', validation.saveUser, usersController.updateUser);

// Delete a User with id
routes.delete('/:id', usersController.deleteUser);

// Erase
// // Delete all Users
// routes.delete('/', usersController.deleteAll);

module.exports = routes;