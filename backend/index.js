import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Add this for form data support
app.use(bodyParser.json());
app.use(cors());

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
// Set Google credentials dynamically
const googleKeyPath = path.resolve(__dirname, process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
process.env.GOOGLE_APPLICATION_CREDENTIALS = googleKeyPath;

//console.log("Google Credentials Path:", process.env.GOOGLE_APPLICATION_CREDENTIALS)

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/auth', authRoutes);
app.use("/api/resume", resumeRoutes);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'API route not found' }); // Return 404 for undefined API routes
  });
  
// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
