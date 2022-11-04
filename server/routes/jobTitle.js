import express from "express";

import { createJobTitle } from '../controllers/jobTitle.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', createJobTitle);

export default router;