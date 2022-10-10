import express from "express";

import { getEmployees, createEmployee } from '../controllers/employees.js'

const router = express.Router();

router.get('/', getEmployees);
router.post('/', createEmployee)

export default router;