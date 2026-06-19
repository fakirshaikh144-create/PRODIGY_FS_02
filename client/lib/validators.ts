import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const employeeSchema = z.object({
  employeeId: z.string().trim().min(3, "Employee ID must be at least 3 characters."),
  fullName: z.string().trim().min(3, "Full name must be at least 3 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(10, "Phone must be at least 10 characters."),
  department: z.string().trim().min(2, "Department is required."),
  position: z.string().trim().min(2, "Position is required."),
  salary: z.coerce.number().positive("Salary must be a positive number."),
  dateOfJoining: z.string().min(10, "Date of joining is required."),
  status: z.enum(["ACTIVE", "ON_LEAVE", "INACTIVE"]),
  address: z.string().trim().min(5, "Address must be at least 5 characters."),
  emergencyContact: z.string().trim().min(5, "Emergency contact must be at least 5 characters."),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
