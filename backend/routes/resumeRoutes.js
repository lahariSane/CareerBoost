import express from "express";
import multer from "multer";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import * as pdfParseModule from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/**
 * pdf-parse ESM-compatible setup
 * Handles both:
 *  - export = function (CommonJS style)
 *  - export default function (ESM style)
 */
const pdfParse =
  typeof pdfParseModule === "function"
    ? pdfParseModule
    : pdfParseModule.default;

console.log("pdf-parse loaded, typeof pdfParse =", typeof pdfParse);

// Multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Gemini setup
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. /api/resume/upload will fail.");
}
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Simple test route
router.get("/upload", (req, res) => {
  res.send("Hello from Resume Routes!");
});

router.post(
  "/upload",
  authenticateToken,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!genAI) {
        return res.status(500).json({
          message: "Server misconfiguration: GEMINI_API_KEY is missing.",
        });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const { jobDescription } = req.body;
      const file = req.file;

      if (!jobDescription || !file) {
        return res
          .status(400)
          .json({ message: "Job description and resume are required." });
      }

      // Optional: ensure it's a PDF
      if (file.mimetype !== "application/pdf") {
        return res
          .status(400)
          .json({ message: "Only PDF resumes are supported right now." });
      }

      // 1️⃣ Extract text from PDF using pdf-parse
      let pdfData;
      try {
        pdfData = await pdfParse(file.buffer);
      } catch (parseErr) {
        console.error("Error parsing PDF:", parseErr);
        return res
          .status(400)
          .json({ message: "Could not read the uploaded PDF resume." });
      }

      const resumeText = (pdfData.text || "").trim();

      if (!resumeText) {
        return res.status(400).json({
          message:
            "The resume appears to be empty or unreadable. Please upload a clearer PDF.",
        });
      }

      // 2️⃣ Build prompt for Gemini
      const prompt = `
You are an ATS (Applicant Tracking System) resume analyzer.

Given:
- A job description
- A resume text

You must evaluate how well the resume matches the job.

Return STRICT JSON ONLY (no markdown, no explanations) in this exact schema:

{
  "atsScore": number,                          // 0-100
  "breakdownData": [
    { "section": "Formatting", "score": number },       // 0-20
    { "section": "Skills Match", "score": number },     // 0-20
    { "section": "Keyword Usage", "score": number },    // 0-20
    { "section": "Education", "score": number },        // 0-20
    { "section": "Experience", "score": number }        // 0-20
  ],
  "suggestions": [
    "string", "string", "..."
  ],
  "visualInsights": {
    "keywordDensity": [
      { "keyword": "string", "count": number }
    ],
    "sectionBalance": [
      { "section": "Summary", "percentage": number },
      { "section": "Experience", "percentage": number },
      { "section": "Education", "percentage": number },
      { "section": "Skills", "percentage": number },
      { "section": "Other", "percentage": number }
    ]
  }
}

Rules:
- Make sure atsScore ≈ sum of the five breakdown scores (scaled to 0-100).
- Always fill all 5 breakdown sections exactly as specified above.
- Percentages in sectionBalance should sum to roughly 100.

JOB DESCRIPTION:
"""${jobDescription}"""

RESUME:
"""${resumeText}"""
`;

      // 3️⃣ Call Gemini
      const result = await model.generateContent(prompt);
      const response = result.response;
      const rawText = response.text();

      // 4️⃣ Parse JSON (defensive parsing)
      let analysis;
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : rawText;
        analysis = JSON.parse(jsonString);
      } catch (e) {
        console.error("Failed to parse Gemini JSON:", rawText);
        return res
          .status(500)
          .json({ message: "Failed to parse AI response." });
      }

      // 5️⃣ Return structured data to frontend
      return res.json({
        atsScore: analysis.atsScore,
        breakdownData: analysis.breakdownData,
        suggestions: analysis.suggestions,
        visualInsights: analysis.visualInsights,
        fileUrl: null, // for future storage integration
      });
    } catch (err) {
      console.error("Error in /api/resume/upload:", err);
      return res
        .status(500)
        .json({ message: "Error analyzing resume. Please try again." });
    }
  }
);

export default router;
