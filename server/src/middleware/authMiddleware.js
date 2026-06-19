import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import prisma from '../prisma/client.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization required.' });
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    req.admin = { id: admin.id, email: admin.email, role: admin.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed.' });
  }
};
