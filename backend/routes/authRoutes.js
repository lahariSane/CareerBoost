import express from "express";
import { loginUser, registerUser, googleOAuth } from "../controllers/authController.js";

const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Register Route
router.post("/register", registerUser);

// Google OAuth Route
router.post("/google", googleOAuth);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'API route not found' }); // Return 404 for undefined API routes
  });

export default router;
