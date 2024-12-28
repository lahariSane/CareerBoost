import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, githubId: user.githubId, username: user.username },
    process.env.JWT_SECRET, // Use a secret key stored in environment variables
    { expiresIn: '1h' } // Token expires in 1 hour (adjust as needed)
  );
};


