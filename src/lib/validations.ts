import { z } from 'zod';

export const patientSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  date_of_birth: z.string().refine((date) => {
    const today = new Date();
    const dob = new Date(date);
    return dob <= today;
  }, 'Date of birth cannot be in the future'),
  gender: z.enum(['male', 'female', 'other']),
  contact_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().optional(),
  medical_history: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>; 