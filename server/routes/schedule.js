import express from "express";
import { createSchedule, getSchedules } from '../controllers/schedule.js'
import auth from "../middleware/auth.js";

const router = express.Router()

// SCHEDULE ROUTES
router.get('/', getSchedules) // GET all Schedules
router.post('/', auth, createSchedule) // POST, create Schedule

export default router