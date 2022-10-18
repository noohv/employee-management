import express from "express";

import { getEmployees, createEmployee, updateEmployee } from '../controllers/employees.js'

const router = express.Router();

router.get('/', getEmployees);
router.post('/', createEmployee);
router.patch('/:id', updateEmployee);

export default router;