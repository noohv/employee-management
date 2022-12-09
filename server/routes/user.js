import express from "express";
import { signin, signup } from '../controllers/user.js';
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router()

// User auth routes
router.post('/signin', signin) // POST method for user Log In
router.post('/signup', isAdmin, signup) // POST method for user Registration

export default router