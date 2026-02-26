import { Router } from "express";
import upload from "../middleware/upload.js";
import { analyze } from "../controller/resumeController.js";

const router = Router();

router.post("/upload", upload.single("file"), analyze);

export default router;