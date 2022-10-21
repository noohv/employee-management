import express from "express";

import { getEmployees, createEmployee, updateEmployee } from '../controllers/employees.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getEmployees);
router.post('/',auth, createEmployee);
router.patch('/:id',auth, updateEmployee);

export default router;