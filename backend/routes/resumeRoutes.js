import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resumeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload",authenticateToken, upload.single("resume"), uploadResume);
router.get("/upload", (req, res) => {
  res.send("Hello from Resume Routes!");
});


export default router;
