const routes = require('express').Router();
const game = require('./game');
const user = require('./user');

routes.use('/', require('./swagger'));
routes.use('/games', game);
routes.use('/users', user);

// what do I need to chage this to? Erase
// routes.use('/', (docData = (req, res) => {
//     let docData = {
//       documentationURL: 'https://nathanbirch.github.io/nathan-byui-api-docs',
//     };
//     res.send(docData);
//   })
// );

module.exports = routes;