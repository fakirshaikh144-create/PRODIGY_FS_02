import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import dashboardRoutes from './routes/dashboard.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(morgan('combined'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/employees', authMiddleware, employeeRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`EMS server listening on port ${port}`);
});
