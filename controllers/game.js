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