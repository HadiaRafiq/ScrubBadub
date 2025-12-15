import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    fullname: z.string().min(1, 'Full name is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
    role: z.enum(['Scrub', 'Bud', 'Duber'], {
      errorMap: () => ({ message: 'Please select a role' }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = signInSchema.pick({ email: true });

export const resetPasswordSchema = signUpSchema.pick({
  password: true,
  confirmPassword: true,
});

