// import express from "express";
// import multer from "multer";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import fs from "fs";
// import pdfParse from "pdf-parse";
// import { searchJobs } from "./utils/jobSearch.js";
// import analyzeResumeWithOpenRouter from './utils/openRouter.js';

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;
// const upload = multer({ dest: "uploads/" });

// // app.post("/api/upload", upload.single("file"), async (req, res) => {
// //   try {
// //     // Validate file type
// //     if (req.file.mimetype !== 'application/pdf') {
// //       return res.status(400).json({ message: "Only PDF files are allowed." });
// //     }

// //     // Read PDF content
// //     const filePath = req.file.path;
// //     const fileBuffer = fs.readFileSync(filePath);
// //     const pdfData = await pdfParse(fileBuffer);

// //     // Log parsed PDF content for debugging
// //     console.log('Parsed PDF Content:', pdfData.text);

// //     // Analyze with AI
// //     const analysis = await analyzeResumeWithOpenRouter(pdfData.text);
// //     const cleanedAnalysis = analysis.replace(/```json|```/g, '').trim();
// //     const parsed = JSON.parse(cleanedAnalysis);

// //     // Log AI analysis result
// //     // console.log('AI Analysis:', parsed);

// //     // Extract keywords
// //     const keywords = parsed.skills || [];
// //     if (keywords.length === 0) {
// //       return res.status(400).json({ message: "No skills found in the resume to search for jobs." });
// //     }

// //     // Fetch job listings based on keywords
// //     const jobs = await searchJobs(keywords);

// //     // Cleanup uploaded file
// //     fs.unlinkSync(filePath);

// //     // Send response
// //     return res.json({
// //       resumeData: parsed,
// //       jobMatches: jobs
// //     });

// //   } catch (error) {
// //     console.error('Error:', error);
// //     return res.status(500).json({
// //       message: "Something went wrong while processing the resume and fetching job listings",
// //       error: error.message
// //     });
// //   }
// // });


// // app.post("/api/upload", upload.single("file"), async (req, res) => {
// //   try {
// //     // Validate the file
// //     if (!req.file) {
// //       return res.status(400).json({ message: "No file uploaded." });
// //     }

// //     // Validate file type (only PDF allowed)
// //     if (req.file.mimetype !== "application/pdf") {
// //       return res.status(400).json({ message: "Only PDF files are allowed." });
// //     }

// //     // Read PDF content
// //     const filePath = req.file.path;
// //     const fileBuffer = fs.readFileSync(filePath);
// //     const pdfData = await pdfParse(fileBuffer);

// //     // console.log('Parsed PDF Content:', pdfData.text);

// //     // Analyze resume with AI
// //     const analysis = await analyzeResumeWithOpenRouter(pdfData.text);
// //     // console.log("Raw AI Analysis:", analysis);  // Log raw AI analysis
    
// //     const cleanedAnalysis = analysis.replace(/```json|```/g, '').trim();
// //     // console.log("Cleaned AI Analysis:", cleanedAnalysis);  // Log cleaned AI analysis
    
// //     const parsed = JSON.parse(cleanedAnalysis);
// //     console.log("Parsed AI Analysis:", parsed); 
    
// //     // Log the parsed result
// //     const technicalSkillsBlock = parsed['Technical skills'] || parsed['Technical  skills'] || parsed['skills'] || {};
// //     const programmingLanguages = technicalSkillsBlock['Programming Languages'] || [];
// //     const webTechnologies = technicalSkillsBlock['Web Technologies'] || [];
// //     const toolsAndPlatforms = technicalSkillsBlock['Tools & Platforms'] || [];
    
// //     // If some skills are flat arrays instead of nested
// //     const flatSkills = Array.isArray(technicalSkillsBlock) ? technicalSkillsBlock : [];
    
// //     let keywords = [
// //       ...flatSkills,
// //       ...programmingLanguages,
// //       ...webTechnologies,
// //       ...toolsAndPlatforms
// //     ].filter(Boolean); // Remove falsy (null/undefined) entries
// //     console.log("Extracted Keywords:", keywords);

// //     if (keywords.length === 0) {
// //       return res.status(400).json({ message: "No skills found in the resume to search for jobs." });
// //     }

// //     // Fetch job listings based on keywords
// //     const jobs = await searchJobs(keywords);

// //     // Cleanup uploaded file
// //     fs.unlinkSync(filePath);

// //     // Send response
// //     return res.json({
// //       resumeData: parsed,
// //       jobMatches: jobs
// //     });

// //   } catch (error) {
// //     console.error('Error:', error);
// //     return res.status(500).json({
// //       message: "Something went wrong while processing the resume and fetching job listings",
// //       error: error.message
// //     });
// //   }
// // });


// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     // Check for file existence
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }

//     // Only allow PDFs
//     if (req.file.mimetype !== "application/pdf") {
//       return res.status(400).json({ message: "Only PDF files are allowed." });
//     }

//     const filePath = req.file.path;
//     const fileBuffer = fs.readFileSync(filePath);
//     const pdfData = await pdfParse(fileBuffer);

//     // Analyze using OpenRouter (AI)
//     const rawAnalysis = await analyzeResumeWithOpenRouter(pdfData.text);
//     const cleanedAnalysis = rawAnalysis.replace(/```json|```/g, "").trim();

//     let parsed;
//     try {
//       parsed = JSON.parse(cleanedAnalysis);
//     } catch (parseError) {
//       fs.unlinkSync(filePath);
//       return res.status(500).json({
//         message: "Failed to parse AI analysis response.",
//         raw: cleanedAnalysis,
//         error: parseError.message,
//       });
//     }

//     // Extract skills from structured or flat blocks
//     const technicalSkills =
//       parsed["Technical skills"] ||
//       parsed["Technical  skills"] ||
//       parsed["skills"] ||
//       {};

//     const programmingLanguages = technicalSkills["Programming Languages"] || [];
//     const webTechnologies = technicalSkills["Web Technologies"] || [];
//     const toolsAndPlatforms = technicalSkills["Tools & Platforms"] || [];

//     // If it's a flat array instead of nested object
//     const flatSkills = Array.isArray(technicalSkills) ? technicalSkills : [];

//     const keywords = [
//       ...flatSkills,
//       ...programmingLanguages,
//       ...webTechnologies,
//       ...toolsAndPlatforms,
//     ].filter(Boolean); // Remove empty or null values
//      console.log(keywords)
//     if (keywords.length === 0) {
//       fs.unlinkSync(filePath);
//       return res.status(400).json({ message: "No skills found in the resume to search for jobs." });
//     }

//     // Search for jobs based on extracted keywords
//     // const jobs = await searchJobs(keywords);


 
    
//     // Call the search function with debug keywords
//     const jobs = await searchJobs(keywords);  // Wait for jobs to be returned

//     console.log('Job Search Results:', jobs);
//     // Cleanup
//     fs.unlinkSync(filePath);

//     return res.json({
//       resumeData: parsed,
//       jobMatches: jobs,
//     });
//   } catch (error) {
//     console.error("Server Error:", error);
//     return res.status(500).json({
//       message: "Something went wrong while processing the resume and fetching job listings.",
//       error: error.message,
//     });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);

// });

// ai search query
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import pdfParse from "pdf-parse";
import { searchJobs } from "./utils/jobSearch.js";
import generateJobSearchQuery from './utils/openRouter.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed." });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);

    // AI generates the best job search query
    const query = await generateJobSearchQuery(pdfData.text);
    console.log("Generated Search Query:", query);

    const jobs = await searchJobs([query]); // searchJobs expects an array of terms
    console.log("Job Results:", jobs);

    fs.unlinkSync(filePath);

    return res.json({
      searchQuery: query,
      jobMatches: jobs
    });
  } catch (error) {
    console.error("Error in /api/upload:", error);
    return res.status(500).json({
      message: "Failed to analyze resume and search for jobs.",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
