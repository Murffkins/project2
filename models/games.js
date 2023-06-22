module.exports = (mongoose) => {
    const Game = mongoose.model(
      'games',
      mongoose.Schema(
        {
          game_id: Number,
          name: String,
          genre: String,
          console: String,
          additionalInfo: Boolean,
        },
        { timestamps: true }
      )
    );
  
    return Game;
  };