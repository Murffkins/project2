// // The model(s) save(s) data in the database (MongoDB)
// // Everything that interacts with the database will use mongoose

// const mongoose = require('mongoose')

// // Create the schema
// const gameSchema = mongoose.Schema(
//     {
//       game_id: {
//             type: Number,
//             // "Please enter game id" is validation
//             required: [true, "Please enter a game ID"] 
//       },
//       name: {
//           type: String,
//           required: true,
//       },
//       genre: {
//           type: String,
//           required: false,
//       },
//       console: {
//           type: String,
//           required: true,
//       }
//     },
//     {
//         // Used to create two fields which keep track of when data is created and updated (when data is saved to the database and when it is modified)
//         timestamps: true
//     }
// )





// Create the model
// Model named Product
const Game = mongoose.model('Game', gameSchema);


// Export the module
module.exports = Game;





// module.exports = (mongoose) => {
//     const Game = mongoose.model(
//       'games',
//       mongoose.Schema(
//         {
//           game_id: Number,
//           name: String,
//           genre: String,
//           console: String,
//           additionalInfo: Boolean,
//         },
//         { timestamps: true }
//       )
//     );
  
//     return Game;
//   };