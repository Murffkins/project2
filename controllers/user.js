// Where you put all of your logic to keep routes uncluttered (Define functions)

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all the 'users' data
const getAllUsers = async (req, res, next) => {
  // Uses 'getDb' instead of 'initDb'
  try {
      const result = await mongodb.getDb().db().collection('users').find();
      result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
  });
  } catch (error) {
      console.log(error);
  }
  
};

// Get a single 'user' data
const getSingleUser = async (req, res, next) => {
  try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getDb().db().collection('users').find({_id: userId});
      result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      });
  } catch (error) {
      console.log(error);
  }

};

// Create a new 'user'
const createUser = async (req, res) => {
const user = {
  userId: req.body.userId,
  userName: req.body.userName,
  password: req.body.password,
  email: req.body.email,
};
const response = await mongodb.getDb().db().collection('users').insertOne(user);
if (response.acknowledged) {
  res.status(201).json(response);
} else {
  res.status(500).json(response.error || 'Some error occured while creating the user');
}
};

// Update a 'user'
// Added validation for L06
const updateUser = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json('Must use a valid user id to update a user.');
}
const userId = new ObjectId(req.params.id);
// Be aware of updateOne if you only want to update specific fields
const user = {
  userId: req.body.userId,
  userName: req.body.userNameame,
  password: req.body.password,
  email: req.body.email,
};
const response = await mongodb
  .getDb()
  .db()
  .collection('users')
  .replaceOne({_id: userId}, user);
console.log(response);
if (response.modifiedCount > 0) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || "Some error occured while updating the user.");
}
};

// Delete a 'user'
// Added validation for L06
const deleteUser = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json('Must use a valid user id to delete a user.');
}
const userId = new ObjectId(req.params.id);
const response = await mongodb
  .getDb()
  .db()
  .collection('users')
  .deleteOne({ _id: userId }, true);
console.log(response);
if (response.deletedCount > 0) {
res.status(204).send();
} else {
res.status(500).json(response.error || 'Some error occurred while deleting the user.');
}
};

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };






// Erase maybe
// const db = require('../models/server');
// const User = db.users;

// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({ message: 'Content can not be empty!' });
//     return;
//   }

//   // Create a User
//   const user = new User({
//     user_id: req.body.user_id,
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//   });
//   // Save User in the database
//   user
//     .save(user)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while creating the User.',
//       });
//     });
// };

// exports.findAll = (req, res) => {
//     User.find(
//       {},
//       {
//         user_id: 1,
//         username: 1,
//         password: 1,
//         email: 1,
//         _id: 0,
//       }
//     )
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || 'Some error occurred while retrieving users.',
//         });
//       });
// };

// // Find a single User with an id
// exports.findOne = (req, res) => {
//     User.find({ user_id: req.params.user_id })
//       .then((data) => {
//         if (!data)
//           res
//             .status(404)
//             .send({ message: 'Not found User with id ' + req.params.user_id });
//         else res.send(data[0]);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: 'Error retrieving User with user_id=' + req.params.user_id,
//         });
//       });
// };







// // Update a User by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Data to update can not be empty!',
//     });
//   }

//   const id = req.params.id;

//   User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update User with id=${id}. Maybe User was not found!`,
//         });
//       } else res.send({ message: 'User was updated successfully.' });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error updating User with id=' + id,
//       });
//     });
// };

// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   User.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`,
//         });
//       } else {
//         res.send({
//           message: 'User was deleted successfully!',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Could not delete User with id=' + id,
//       });
//     });
// };

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Users were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all users.',
//       });
//     });
// };

// // Find all published Users
// exports.findAllPublished = (req, res) => {
//   User.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving user.',
//       });
//     });
// };