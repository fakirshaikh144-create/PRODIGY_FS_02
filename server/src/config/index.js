import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'change-this-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '4h',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL,
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10)
};
