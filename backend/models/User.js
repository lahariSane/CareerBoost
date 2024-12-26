import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  githubId: {
    type: String,
    unique: true, // Optional, but ensures no two users have the same GitHub ID
  },
});

const User = mongoose.model('User', userSchema);
export default User;
