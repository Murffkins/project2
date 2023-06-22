const db = require('../models/server');
const Game = db.games;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
   /*
    #swagger.description = 'API Key if needed: Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  */
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a Game
  const game = new Game({
    game_id: req.body.game_id,
    name: req.body.name,
    genre: req.body.genre,
    console: req.body.console,
  });
  // Save Game in the database
  game
    .save(game)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Game.',
      });
    });
};

exports.findAll = (req, res) => {
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    Game.find(
      {},
      {
        game_id: 1,
        name: 1,
        genre: 1,
        console: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving games.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single Game with an id
exports.findOne = (req, res) => {
  const game_id = req.params.game_id;
  if (req.header('apiKey') === apiKey) {
    Game.find({ game_id: game_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Game with id ' + game_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Game with game_id=' + game_id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// // Update a Game by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Data to update can not be empty!',
//     });
//   }

//   const id = req.params.id;

//   Game.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Game with id=${id}. Maybe Game was not found!`,
//         });
//       } else res.send({ message: 'Game was updated successfully.' });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error updating Game with id=' + id,
//       });
//     });
// };

// // Delete a Game with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Game.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Game with id=${id}. Maybe Game was not found!`,
//         });
//       } else {
//         res.send({
//           message: 'Game was deleted successfully!',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Could not delete Game with id=' + id,
//       });
//     });
// };

// // Delete all Games from the database.
// exports.deleteAll = (req, res) => {
//   Game.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Games were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all games.',
//       });
//     });
// };

// // Find all published Games
// exports.findAllPublished = (req, res) => {
//   Game.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving game.',
//       });
//     });
// };