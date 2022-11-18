import express from "express";
import { signin, signup } from '../controllers/user.js';

const router = express.Router()

// USER AUTH ROUTES
router.post('/signin', signin) // POST, User Sign In
router.post('/signup', signup) // POST, User Sign Up

export default router