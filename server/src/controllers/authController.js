import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import { config } from '../config/index.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ error: 'Invalid email or password.' });

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password.' });

    const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    res.status(200).json({ token, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful.' });
};

export const getMe = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization required.' });
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
    if (!admin) return res.status(401).json({ error: 'Invalid token.' });

    res.json({ admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    next(error);
  }
};
