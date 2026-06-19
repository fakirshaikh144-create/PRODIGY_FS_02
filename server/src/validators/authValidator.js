import { z } from 'zod';

export const loginValidator = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.')
  })
});
