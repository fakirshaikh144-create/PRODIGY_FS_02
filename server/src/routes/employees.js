import express from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee
} from '../controllers/employeeController.js';
import {
  employeeCreateValidator,
  employeeIdValidator,
  employeeUpdateValidator
} from '../validators/employeeValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', validateRequest(employeeIdValidator), getEmployee);
router.post('/', validateRequest(employeeCreateValidator), createEmployee);
router.put('/:id', validateRequest(employeeUpdateValidator), updateEmployee);
router.delete('/:id', validateRequest(employeeIdValidator), deleteEmployee);

export default router;