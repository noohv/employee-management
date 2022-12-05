import express from "express";
import { getSchedule, createSchedule, getSchedules, updateSchedule, deleteSchedule } from '../controllers/schedule.js'
import auth from "../middleware/auth.js";

const router = express.Router()

// SCHEDULE ROUTES
router.get('/', auth, getSchedules) // GET all Schedules
router.get('/:id', auth, getSchedule) // GET selected Schedule
router.post('/', auth, createSchedule) // POST, create Schedule
router.patch('/:id/employee/schedule/:empId', auth, updateSchedule) // PATCH, update Schedule
router.delete('/:id', auth, deleteSchedule) // DELETE Schedule

export default router