import { z } from 'zod';

const statusEnum = z.enum(['ACTIVE', 'ON_LEAVE', 'INACTIVE']);

export const employeeCreateValidator = z.object({
  body: z.object({
    employeeId: z.string().min(3, 'Employee ID is required.'),
    fullName: z.string().min(3, 'Full name is required.'),
    email: z.string().email('Please provide a valid email address.'),
    phone: z.string().min(10, 'Phone number is required.'),
    department: z.string().min(2, 'Department is required.'),
    position: z.string().min(2, 'Position is required.'),
    salary: z.number().positive('Salary must be a positive amount.'),
    dateOfJoining: z.string().min(10, 'Date of joining is required.'),
    status: statusEnum,
    address: z.string().min(5, 'Address is required.'),
    emergencyContact: z.string().min(5, 'Emergency contact is required.')
  })
});

export const employeeUpdateValidator = z.object({
  body: z.object({
    employeeId: z.string().min(3).optional(),
    fullName: z.string().min(3).optional(),
    email: z.string().email('Please provide a valid email address.').optional(),
    phone: z.string().min(10).optional(),
    department: z.string().min(2).optional(),
    position: z.string().min(2).optional(),
    salary: z.number().positive('Salary must be a positive amount.').optional(),
    dateOfJoining: z.string().min(10).optional(),
    status: statusEnum.optional(),
    address: z.string().min(5).optional(),
    emergencyContact: z.string().min(5).optional()
  })
});
