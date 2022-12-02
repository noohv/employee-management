import express from "express";
import { createJobTitle, getJobTitles, deleteJobTitle } from '../controllers/jobTitle.js';
import auth from "../middleware/auth.js";

const router = express.Router()

// JOB TITLE ROUTES
router.post('/', auth, createJobTitle) // POST, create Job Title
router.get('/', auth, getJobTitles) // GET all Job Titles
router.delete('/:id', auth, deleteJobTitle) // DELETE, delete Job Title

export default router