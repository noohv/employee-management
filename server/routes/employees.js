import express from "express";

import { getEmployees, createEmployee, updatePost } from '../controllers/employees.js'

const router = express.Router();

router.get('/', getEmployees);
router.post('/', createEmployee)
router.patch('/:id', updatePost)

export default router;