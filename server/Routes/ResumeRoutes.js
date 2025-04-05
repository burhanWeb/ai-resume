import express from "express";

import { generateResume } from "../controllers/ResumeControllers.js";

const router = express.Router();

router.post("/generate", generateResume);

export default router;
