import express from "express";
import { signin, createUser, getUsers } from '../controllers/user.js';
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router()

// User auth routes
router.post('/signin', signin) // POST method for user Log In
router.post('/create', auth, isAdmin, createUser) // POST method for user Registration
router.get('/users', auth, isAdmin, getUsers) // GET method for user fetching

export default router