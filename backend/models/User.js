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
    default:"",
  },
  githubId: {
    type: String,
    default: "",
  },
  otp: { 
    type: String 
  }, // Store the hashed OTP
  otpExpiresAt: { 
    type: Date 
  }, // Expiration time
  resetToken: {
    type: String,
  },
  resetTokenExpiresAt: {
    type: Date,
  },
  resumeLink: {
    type: String,
    default:"",
  },
});

const User = mongoose.model('User', userSchema);
export default User;
