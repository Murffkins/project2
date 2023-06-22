module.exports = (mongoose) => {
    const User = mongoose.model(
      'users',
      mongoose.Schema(
        {
          game_id: Number,
          username: String,
          password: String,
          email: String,
          additionalInfo: Boolean,
        },
        { timestamps: true }
      )
    );
  
    return User;
  };