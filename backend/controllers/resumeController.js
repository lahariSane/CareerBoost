import fs from "fs";
import { uploadToDrive } from "../utils/googleDriveUpload.js";
import User from "../models/User.js";

export const uploadResume = async (req, res) => {
  // if (!req.file) {
  //   return res.status(400).json({ error: "No file uploaded" });
  // }

  // const filePath = req.file.path;
  // const fileName = req.file.originalname;

  // try {
  //   const fileUrl = await uploadToDrive(filePath, fileName);

  //   fs.unlinkSync(filePath);

  //   res.json({ success: true, fileUrl });
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to upload file to Google Drive" });
  // }

  try {
    const userId = req.user.id; // Extract user ID from JWT
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileName = `${userId}_resume.pdf`;

    // Upload file to Google Drive
    const driveLink = await uploadToDrive(filePath, fileName);

    // Delete file from local server
    fs.unlinkSync(filePath);

    // Update user's resumeLink in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { resumeLink: driveLink },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Resume uploaded successfully", fileUrl: driveLink });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }

};
