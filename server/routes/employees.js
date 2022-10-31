import express from "express";

import { getEmployees, createEmployee, updateEmployee, getEmployee, createAbsence, getEmployeeAbsences } from '../controllers/employees.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/', createEmployee);
router.patch('/:id', updateEmployee);
router.post('/:id/absence', createAbsence)

export default router;