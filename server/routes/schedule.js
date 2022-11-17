import express from "express";

import { createSchedule, getSchedules } from '../controllers/schedule.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getSchedules);
router.post('/', auth, createSchedule);

export default router;