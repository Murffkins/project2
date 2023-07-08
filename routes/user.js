const routes = require('express').Router();
const usersController = require('../controllers/user.js');


// Added validation for L06
const validation = require('../middleware/validate');

// Retrieve all published Users
routes.get('/users', usersController.getAllUsers);

// Retrieve a single User with id
routes.get('/users/:id', usersController.getSingleUser);

// Create a new User
routes.post('/users', validation.saveUser, usersController.createUser);

// Update a User with id
routes.put('/users/:id', validation.saveUser, usersController.updateUser);

// Delete a User with id
routes.delete('/users/:id', usersController.deleteUser);


module.exports = routes;