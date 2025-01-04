import bcrypt from 'bcryptjs'; // If using bcrypt to hash passwords
import User from '../models/User.js'; // Assuming you have a User model to interact with MongoDB
import { client } from '../utils/googleOAuth.js'; // Google OAuth client
import axios from 'axios'; // For making HTTP requests
import nodemailer from 'nodemailer'; // For sending emails
import { generateOTP, hashOTP, verifyOTP } from '../utils/otpGenerator.js'; // OTP generator functions
import { generateToken } from '../utils/jwtTokenGenerator.js';
import jwt from 'jsonwebtoken'; // For generating JWTs


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

    const token = generateToken(user);
    // Send success response
    return res.status(200).json({
      message: 'Login successful',
      token,
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

    const token = generateToken(newUser);

    // Send success response
    return res.status(201).json({
      message: 'User registered successfully',
      token, // Return some user info if needed
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' }); // 500 for server issues
  }
};

export const resetPasswordRequest = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset password token (JWT)
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token valid for 1 hour
    });

    // Save the reset token and expiration time
    user.resetToken = resetToken;
    user.resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send the reset password link to the user's email
  
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}. The link is valid for 1 hour.`,
    });

    return res.status(200).json({ message: 'Password reset link sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Reset Password Controller - Updates the password after validating the reset token
export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { email } = req.user;

  try {
    // Find the user by the email decoded from the token
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    else if (!user.resetToken || new Date() > user.resetTokenExpiresAt) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid or expired reset token' });
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

    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};

export const githubOAuth = async (req, res) => {
  const { code } = req.query;

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

    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ githubId });

    // Step 3: Check if the user already exists in the database
    if (user) {
      // Merge GitHub data with existing user data
      if (!user.githubId) {
        user.githubId = githubId;
        user.username = user.username || username; // Update username if not already set
        await user.save();
      }

      const token = generateToken(user);

      return res.status(200).json({
        message: 'Login successful',
        token,
        // user: { id: user._id, email: user.email, username: user.username, access_token: accessToken },
      });
    }

    // Step 4: If email is missing or user does not exist, create a new user
    user = new User({
      email: email || username + "@github.com", // Store `null` if email is not provided
      username,
      githubId, // Store GitHub-specific user ID
    });


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

export const sendOTP = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      // If user doesn't exist, create a new one
      user = new User({
        email,
        username: name,
        password: hashedPassword,
        otp: null, // Placeholder for OTP
        otpExpiresAt: null, // Placeholder for OTP expiration
      });

      await user.save();

      // Generate OTP
      const otp = generateOTP();
      const hashedOTP = await hashOTP(otp);

      // Save OTP and expiration time
      user.otp = hashedOTP;
      user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // Valid for 5 minutes
      await user.save();

      const token = generateToken(user);

      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL, // Your email
          pass: process.env.EMAIL_PASSWORD, // Your email password
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      });

      return res.status(200).json({ message: 'OTP sent successfully', token: token });
    }
    else if (user.githubId) {
      return res.status(400).json({ message: 'User signed up with GitHub. Please login with GitHub' });
    }

    else if (user.otp && new Date() < user.otpExpiresAt) {
      return res.status(400).json({ message: 'OTP already sent. Please check your email' });
    }
    else {
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};

export const verifyOTPCode = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP is expired
    if (!user.otp || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    // Verify OTP
    const isMatch = await verifyOTP(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP verified successfully
    // Clear OTP fields after verification
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};


export const resendOTP = async (req, res) => {
  const { email } = req.user;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (!user.otp) {
    return res.status(400).json({ message: "Email verified already" });
  }

  const otp = generateOTP();
  const hashedOTP = await hashOTP(otp);
  try {
    user.otp = hashedOTP;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // Valid for 5 minutes
    await user.save();

    const token = generateToken(user);

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    return res.status(200).json({ message: 'OTP sent successfully', token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
}