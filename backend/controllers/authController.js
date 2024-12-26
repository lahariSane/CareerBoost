import bcrypt from 'bcryptjs'; // If using bcrypt to hash passwords
import User from '../models/User.js'; // Assuming you have a User model to interact with MongoDB
import { client } from '../utils/googleOAuth.js'; // Google OAuth client
import axios from 'axios'; // For making HTTP requests


// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required for login' });
  }

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

export const googleOAuth = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email } = ticket.getPayload();

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        message: 'Login successful',
        user: { id: existingUser._id, email: existingUser.email },
      });
    }

    // Create a new user
    const newUser = new User({
      email,
    });

    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};

export const githubOAuth = async (req, res) => {
  const { code } = req.query;
  console.log(code);

  try {
    // Step 1: Exchange the code for an access token
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json', // GitHub returns JSON if this header is present
        },
      }
    );

    if (!tokenResponse.data.access_token) {
      return res.status(400).json({ message: 'Failed to retrieve access token from GitHub' });
    }

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Fetch user details from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let { email, id: githubId, login: username } = userResponse.data;
    console.log(email, githubId, username);

    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ githubId });

      console.log(user);

    // Step 3: Check if the user already exists in the database
    if (user) {
      // Merge GitHub data with existing user data
      if (!user.githubId) {
        user.githubId = githubId;
        user.username = user.username || username; // Update username if not already set
        await user.save();
      }

      return res.status(200).json({
        message: 'Login successful',
        user: { id: user._id, email: user.email, username: user.username, access_token: accessToken },
      });
    }

    // Step 4: If email is missing or user does not exist, create a new user
    user = new User({
      email: email || username+"@github.com", // Store `null` if email is not provided
      username,
      githubId, // Store GitHub-specific user ID
    });

    console.log(user);

    await user.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, email: user.email, username: user.username, access_token: accessToken },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};
