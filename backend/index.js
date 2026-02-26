
// import express from "express";
// import multer from "multer";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import fs from "fs";
// import pdfParse from "pdf-parse";
// import mammoth from "mammoth";
// import { searchJobs } from "./utils/jobSearch.js";
// import generateJobSearchQuery from "./utils/openRouter.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// const PORT = process.env.PORT ;

// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }

//     const filePath = req.file.path;
//     const mimeType = req.file.mimetype;
//     let extractedText = "";

//     // 🔥 Handle Different File Types Professionally

//     if (mimeType === "application/pdf") {
//       const fileBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdfParse(fileBuffer);
//       extractedText = pdfData.text;

//     } else if (
//       mimeType ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       // DOCX
//       const result = await mammoth.extractRawText({ path: filePath });
//       extractedText = result.value;

//     } else if (mimeType === "text/plain") {
//       // TXT
//       extractedText = fs.readFileSync(filePath, "utf8");

//     } else {
//       fs.unlinkSync(filePath);
//       return res.status(400).json({
//         message: "Unsupported file format. Please upload PDF, DOCX, or TXT.",
//       });
//     }

//     // ❗ If resume text is empty
//     if (!extractedText || extractedText.trim().length < 50) {
//       fs.unlinkSync(filePath);
//       return res.status(400).json({
//         message: "Could not extract enough text from the document.",
//       });
//     }

//     // 🤖 AI generates search query
//     const query = await generateJobSearchQuery(extractedText);

//     const jobs = await searchJobs([query]);

//     fs.unlinkSync(filePath);

//     return res.json({
//       searchQuery: query,
//       jobMatches: jobs,
//     });

//   } catch (error) {
//     console.error("Error in /api/upload:", error);

//     return res.status(500).json({
//       message: "Failed to analyze resume and search for jobs.",
//       error: error.message,
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import analyseRoute from "./router/analyseRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());



app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === "Unsupported file format.") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal server error." });
});

app.use("/api",analyseRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});