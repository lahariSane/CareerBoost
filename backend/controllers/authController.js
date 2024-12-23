import bcrypt from 'bcryptjs'; // If using bcrypt to hash passwords
import User from '../models/User.js'; // Assuming you have a User model to interact with MongoDB

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' }); // 401 for user not found
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // 401 for incorrect password
    }

    // Send success response
    return res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, email: user.email }, // Return some user info if needed
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' }); // 500 for server issues
  }
};

// Register Controller
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'Email is already in use' }); // 400 if email already exists
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Send success response
    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, email: newUser.email }, // Return some user info if needed
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' }); // 500 for server issues
  }
};
