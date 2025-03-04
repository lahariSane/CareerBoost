import fs from "fs";
import { google } from "googleapis";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const KEYFILEPATH = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
const FOLDER_ID = process.env.DRIVE_UPLOADS_FOLDER_ID;
const PERSONAL_EMAIL = process.env.COMPANY_EMAIL;
// const PERSONAL_EMAIL = "careerboost.connect@gmail.com";  

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

export async function uploadToDrive(filePath, fileName) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [FOLDER_ID ? [FOLDER_ID] : []], 
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(filePath),
      },
    });

    const fileId = response.data.id;
    console.log("Uploaded File ID:", fileId);

    if (!fileId) {
      console.error("File upload failed, fileId is undefined.");
      throw new Error("File upload failed.");
    }


    const fileMetadata = await drive.files.get({ fileId });
    if (!fileMetadata) {
      throw new Error(`File not found after upload: ${fileId}`);
    }

    // Share with Personal Gmail Account
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "user",
        emailAddress: PERSONAL_EMAIL,
      },
    });

    console.log(`File uploaded and shared with ${PERSONAL_EMAIL}`);
    return `https://drive.google.com/file/d/${fileId}/view`;
  } catch (error) {
    console.error("Error uploading to Drive:", error);
    throw error;
  }
}

// import fs from "fs";
// import readline from "readline";
// import { google } from "googleapis";
// import dotenv from "dotenv";

// dotenv.config();

// // Load OAuth credentials
// const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
// const TOKEN_PATH = "token.json";

// // Load OAuth client from credentials.json
// async function authorize() {
//   const credentials = JSON.parse(fs.readFileSync("config/credentials.json"));
//   const { client_secret, client_id, redirect_uris } = credentials.web;
//   const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

//   // Check for existing token
//   if (fs.existsSync(TOKEN_PATH)) {
//     const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
//     oAuth2Client.setCredentials(token);
//     return oAuth2Client;
//   } else {
//     return getAccessToken(oAuth2Client);
//   }
// }

// // Get OAuth token if not already stored
// function getAccessToken(oAuth2Client) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });

//   console.log(`Authorize this app by visiting this URL: ${authUrl}`);

//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   return new Promise((resolve) => {
//     rl.question("Enter the code from that page here: ", (code) => {
//       rl.close();
//       oAuth2Client.getToken(code, (err, token) => {
//         if (err) {
//           console.error("Error retrieving access token", err);
//           return;
//         }
//         oAuth2Client.setCredentials(token);
//         fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
//         console.log("Token stored to", TOKEN_PATH);
//         resolve(oAuth2Client);
//       });
//     });
//   });
// }

// // Upload file to your personal Google Drive
// export async function uploadToDrive(filePath, fileName) {
//   try {
//     const auth = await authorize();
//     const drive = google.drive({ version: "v3", auth });

//     const response = await drive.files.create({
//       requestBody: {
//         name: fileName,
//       },
//       media: {
//         mimeType: "application/pdf",
//         body: fs.createReadStream(filePath),
//       },
//     });

//     console.log("File uploaded successfully:", response.data.id);
//     return `https://drive.google.com/file/d/${response.data.id}/view`;
//   } catch (error) {
//     console.error(" Error uploading to Drive:", error);
//     throw error;
//   }
// }
