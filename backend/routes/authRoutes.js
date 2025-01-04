import express from "express";
import { loginUser, registerUser, googleOAuth, githubOAuth, sendOTP, verifyOTPCode, resendOTP, resetPasswordRequest, resetPassword } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Register Route
router.post("/register", registerUser);

// Reset password link
router.post("/resetpassword", resetPasswordRequest);

// update password
router.post("/updatepassword", authenticateToken, resetPassword);

// Google OAuth Route
router.post("/google", googleOAuth);

//Github access token
router.get("/github", githubOAuth);

//Otp 
router.post("/sendotp", sendOTP);
router.post("/verifyotp", authenticateToken, verifyOTPCode);
router.post("/resendotp", authenticateToken, resendOTP);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'API route not found' }); // Return 404 for undefined API routes
  });

export default router;
