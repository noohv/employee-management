import express from "express";

import { createJobTitle, getJobTitles } from '../controllers/jobTitle.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', auth, createJobTitle);
router.get('/', auth, getJobTitles);

export default router;