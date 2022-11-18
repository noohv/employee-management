import express from "express";
import { getEmployees, createEmployee, updateEmployee, getEmployee, createAbsence, deleteEmployee, deleteAbsence } from '../controllers/employees.js';
import auth from "../middleware/auth.js";

const router = express.Router()

// EMPLOYEE ROUTES
router.get('/', auth, getEmployees) // GET all employees
router.get('/:id', auth, getEmployee) // GET specific employee from ID
router.post('/', auth, createEmployee) // POST, create employee
router.delete('/:id', auth, deleteEmployee) // DELETE specific employee from ID
router.patch('/:id', auth, updateEmployee) // PATCH, update specific employee from ID

// EMPLOYEE ABSENCE ROUTES
router.post('/:id/absence', auth, createAbsence) // POST create absence for specific employee
router.delete('/:empId/:id/absence', auth, deleteAbsence) // DELETE absence for specific employee

export default router