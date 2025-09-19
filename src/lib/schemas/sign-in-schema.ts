import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email e/ou senha Incorretos'),
  password: z
    .string()
    .min(8, 'Email e/ou senha Incorretos')
    .regex(/[!@#$%*&^(),.?":{}|<>]/, 'Email e/ou senha Incorretos')
    .regex(/[A-Z]/, 'Email e/ou senha Incorretos')
    .regex(/[a-z]/, 'Email e/ou senha Incorretos')
    .regex(/[0-9]/, 'Email e/ou senha Incorretos'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
