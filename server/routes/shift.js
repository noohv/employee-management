import express from "express";
import { updateShift } from '../controllers/shift.js'
import auth from "../middleware/auth.js";

const router = express.Router()

// SHIFT SCHEDULES
router.post('/', auth, updateShift) // POST, update Shift

export default router