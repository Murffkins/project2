// // The model(s) save(s) data in the database (MongoDB)
// // Everything that interacts with the database will use mongoose

// const mongoose = require('mongoose')

// // Create the schema
// const userSchema = mongoose.Schema(
//     {
//       game_id: {
//             type: Number,
//             // "Please enter game id" is validation
//             required: [true, "Please enter a game ID"] 
//         },
//         userName: {
//             type: String,
//             required: true,
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//         }
//     },
//     {
//         // Used to create two fields which keep track of when data is created and updated (when data is saved to the database and when it is modified)
//         timestamps: true
//     }
// )






// // Create the model
// // Model named Product
// const User = mongoose.model('User', userSchema);


// // Export the module
// module.exports = User;





// module.exports = (mongoose) => {
//     const User = mongoose.model(
//       'users',
//       mongoose.Schema(
//         {
//           game_id: Number,
//           username: String,
//           password: String,
//           email: String,
//           additionalInfo: Boolean,
//         },
//         { timestamps: true }
//       )
//     );
  
//     return User;
//   };