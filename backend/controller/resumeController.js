import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { searchJobs } from "../utils/jobSearch.js";
import generateJobSearchQuery from "../utils/openRouter.js";


export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    let extractedText = "";

    // 🔥 Handle Different File Types Professionally

    if (mimeType === "application/pdf") {
      const fileBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text;

    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // DOCX
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;

    } else if (mimeType === "text/plain") {
      // TXT
      extractedText = fs.readFileSync(filePath, "utf8");

    } else {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        message: "Unsupported file format. Please upload PDF, DOCX, or TXT.",
      });
    }

    // ❗ If resume text is empty
    if (!extractedText || extractedText.trim().length < 50) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        message: "Could not extract enough text from the document.",
      });
    }

    // 🤖 AI generates search query
    const query = await generateJobSearchQuery(extractedText);

    const jobs = await searchJobs([query]);

    fs.unlinkSync(filePath);

    return res.json({
      searchQuery: query,
      jobMatches: jobs,
    });

  } catch (error) {
    console.error("Error in /api/upload:", error);

    return res.status(500).json({
      message: "Failed to analyze resume and search for jobs.",
      error: error.message,
    });
  }
};