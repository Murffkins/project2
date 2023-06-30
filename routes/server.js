const routes = require('express').Router();
// Erase maybe
// const game = require('./game.js');
// const user = require('./user.js');
// console.log erase
console.log("server.js here");

routes.use('/', require('./swagger'));
routes.use('/games', require('./game.js'));
routes.use('/users', require('./user.js'));

// routes.use('/games', game);
// routes.use('/users', user);

// what do I need to chage this to? Erase
// routes.use('/', (docData = (req, res) => {
//     let docData = {
//       documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
//     };
//     res.send(docData);
//   })
// );

module.exports = routes;