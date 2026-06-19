import express from 'express';
import { login, getMe, logout } from '../controllers/authController.js';
import { loginValidator } from '../validators/authValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/login', validateRequest(loginValidator), login);
router.post('/logout', logout);
router.get('/me', getMe);

export default router;
