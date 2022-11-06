import express from "express";

import { getEmployees, createEmployee, updateEmployee, getEmployee, createAbsence, deleteEmployee, deleteAbsence } from '../controllers/employees.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/', createEmployee);
router.delete('/:id', deleteEmployee);
router.patch('/:id', updateEmployee);

router.post('/:id/absence', createAbsence);
router.delete('/:empId/:id/absence', deleteAbsence);

export default router;