import express from "express";

import { getEmployees, createEmployee, updateEmployee, getEmployee, createAbsence, deleteEmployee, deleteAbsence } from '../controllers/employees.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, getEmployees);
router.get('/:id', auth, getEmployee);
router.post('/', auth, createEmployee);
router.delete('/:id', auth, deleteEmployee);
router.patch('/:id', auth, updateEmployee);

router.post('/:id/absence', auth, createAbsence);
router.delete('/:empId/:id/absence', auth, deleteAbsence);

export default router;