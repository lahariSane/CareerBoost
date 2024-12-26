import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/auth', authRoutes);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'API route not found' }); // Return 404 for undefined API routes
  });
  
// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
