// import express from "express"
// import multer from "multer"
// import dotenv from "dotenv"
// import cors from "cors";
// import bodyParser from "body-parser";

// dotenv.config()
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json())

// const PORT = process.env.PORT
// const upload = multer({dest:'uploads/'})

// app.post("/api/upload",upload.single('file'), (req,res)=>{
//   console.log(req.file);
//   return res.json(req.file)
// })

// app.listen(PORT,()=>{
//   console.log(`Server running......${PORT}`)
// })





import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import pdfParse from "pdf-parse";
import { searchJobs } from "./utils/jobSearch.js";
import  analyzeResumeWithOpenRouter  from'./utils/openRouter.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000; // Default port fallback
const upload = multer({ dest: "uploads/" });

// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = req.file.path; // Path to the uploaded file
//     const fileBuffer = fs.readFileSync(filePath); // Read the file as a buffer
//     const pdfData = await pdfParse(fileBuffer); // Extract PDF content
    
//     // console.log(pdfData.text); // Log extracted text
//     const analysis = await analyzeResumeWithOpenRouter(pdfData.text) 
//     const parsed=res.json(JSON.parse(analysis));

//       const keywords = parsed.skills || [];
//       const jobs = await searchJobs(keywords)

//       return res.json({
//         resumeData: parsed,
//         jobMatches: jobs
//       });
    
//     // res.json({ text: pdfData.text }); // Send the text content as response
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Something went wrong while fetching job listings",
//       error: error.message
//     });
//   }
// });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);

    // Analyze with AI
    const analysis = await analyzeResumeWithOpenRouter(pdfData.text);
    const parsed = JSON.parse(analysis); // Just parse, don't send yet

    // Extract keywords (fallback to empty array)
    const keywords = parsed.skills || [];

    // Fetch job listings based on keywords
    const jobs = await searchJobs(keywords);

    // ✅ Send full response once
    return res.json({
      resumeData: parsed,
      jobMatches: jobs
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching job listings",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
