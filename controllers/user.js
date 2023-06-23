const db = require('../models/server');
const User = db.users;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a User
  const user = new User({
    user_id: req.body.user_id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the User.',
      });
    });
};

exports.findAll = (req, res) => {
    User.find(
      {},
      {
        user_id: 1,
        username: 1,
        password: 1,
        email: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving users.',
        });
      });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    User.find({ user_id: req.params.user_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found User with id ' + req.params.user_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving User with user_id=' + req.params.user_id,
        });
      });
};

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