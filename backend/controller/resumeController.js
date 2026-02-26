import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { searchJobs } from "../utils/jobSearch.js";
import generateJobSearchQuery from "../utils/openRouter.js";

export const analyze = async (req, res) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    filePath = req.file.path;
    const mimeType = req.file.mimetype;
    let extractedText = "";

    if (mimeType === "application/pdf") {
      const fileBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(fileBuffer);
      extractedText = pdfData.text;

    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;

    } else if (mimeType === "text/plain") {
      extractedText = fs.readFileSync(filePath, "utf8");
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({
        message: "Could not extract sufficient text.",
      });
    }

    const query = await generateJobSearchQuery(extractedText);
    const jobs = await searchJobs([query]);

    return res.json({
      searchQuery: query,
      jobMatches: jobs,
    });

  } catch (error) {
    console.error("Analyze Error:", error);
    return res.status(500).json({ message: "Failed to analyze resume." });

  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};