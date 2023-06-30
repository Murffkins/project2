// Where you put all of your logic to keep routes uncluttered (Define functions)

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all the 'games' data
const getAllGames = async (req, res, next) => {
  // Uses 'getDb' instead of 'initDb'
  try {
      const result = await mongodb.getDb().db().collection('games').find();
      result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
  });
  } catch (error) {
      console.log(error);
  }
  
};

// Get a single 'game' data
const getSingleGame = async (req, res, next) => {
  try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getDb().db().collection('games').find({_id: userId});
      result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      });
  } catch (error) {
      console.log(error);
  }

};

// Create a new 'game'
const createGame = async (req, res) => {
const game = {
  gameId: req.body.gameId,
  name: req.body.name,
  genre: req.body.genre,
  console: req.body.console,
};
const response = await mongodb.getDb().db().collection('games').insertOne(game);
if (response.acknowledged) {
  res.status(201).json(response);
} else {
  res.status(500).json(response.error || 'Some error occured while creating the game');
}
};

// Update a 'game'
// Added validation for L06
const updateGame = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json('Must use a valid game id to update a game.');
}
const gameId = new ObjectId(req.params.id);
// Be aware of updateOne if you only want to update specific fields
const game = {
  gameId: req.body.gameId,
  name: req.body.name,
  genre: req.body.genre,
  console: req.body.console,
};
const response = await mongodb
  .getDb()
  .db()
  .collection('games')
  .replaceOne({_id: gameId}, game);
console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || "Some error occured while updating the game.");
}
};

// Delete a 'game'
// Added validation for L06
const deleteGame = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json('Must use a valid game id to delete a game.');
}
const gameId = new ObjectId(req.params.id);
const response = await mongodb
  .getDb()
  .db()
  .collection('games')
  .deleteOne({ _id: gameId }, true);
console.log(response);
if (response.deletedCount > 0) {
res.status(204).send();
} else {
res.status(500).json(response.error || 'Some error occurred while deleting the game.');
}
};

module.exports = { getAllGames, getSingleGame, createGame, updateGame, deleteGame };





// Erase maybe
// const db = require('../models/server');
// const Game = db.games;

// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({ message: 'Content can not be empty!' });
//     return;
//   }

//   // Create a Game
//   const game = new Game({
//     game_id: req.body.game_id,
//     name: req.body.name,
//     genre: req.body.genre,
//     console: req.body.console,
//   });
//   // Save Game in the database
//   game
//     .save(game)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while creating the Game.',
//       });
//     });
// };

// const findAll = async (req, res) => {
//       // console.log erase
//     console.log("anything in there"); 
//     Game.find(
//         {},
//         {
//           game_id: 1,
//           name: 1,
//           genre: 1,
//           console: 1,
//           _id: 0,
//         }
//       )
//         .then((data) => {
//           res.send(data);
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message:
//               err.message || 'Some error occurred while retrieving games.',
//           });
//         });
//   };

//   module.exports = { findAll,  }










// exports.findAll = (req, res) => {
//     // console.log erase
//   console.log("anything in there"); 
//   Game.find(
//       {},
//       {
//         game_id: 1,
//         name: 1,
//         genre: 1,
//         console: 1,
//         _id: 0,
//       }
//     )
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || 'Some error occurred while retrieving games.',
//         });
//       });
// };

// // Find a single Game with an id
// exports.findOne = (req, res) => {
//   // console.log erase
//   console.log("find one game");
//     Game.find({ game_id: req.params.game_id })
//       .then((data) => {
//         if (!data)
//           res
//             .status(404)
//             .send({ message: 'Not found Game with id ' + req.params.game_id });
//         else res.send(data[0]);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: 'Error retrieving Game with game_id=' + req.params.game_id,
//         });
//       });
// };

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